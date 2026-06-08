import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Layers, MessageSquare } from 'lucide-react';
import { InteractiveDiagram, DiagramElement } from '../types';

interface InteractiveDiagramProps {
  diagram: InteractiveDiagram;
  onAnnotationSave?: (elementId: string, annotation: string) => void;
}

interface AnnotationState {
  [elementId: string]: string;
}

export default function InteractiveDiagramComponent({
  diagram,
  onAnnotationSave,
}: InteractiveDiagramProps) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<Set<string>>(
    new Set(diagram.layers?.map(l => l.id) ?? ['all'])
  );
  const [annotations, setAnnotations] = useState<AnnotationState>({});
  const [annotatingElement, setAnnotatingElement] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState('');

  // Get visible elements based on layers
  const visibleElements = diagram.layers
    ? diagram.elements.filter(el => {
        const layer = diagram.layers?.find(l => l.elements.some(e => e.id === el.id));
        return !layer || visibleLayers.has(layer.id);
      })
    : diagram.elements;

  const handleLayerToggle = (layerId: string) => {
    setVisibleLayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(layerId)) {
        newSet.delete(layerId);
      } else {
        newSet.add(layerId);
      }
      return newSet;
    });
  };

  const handleStartAnnotation = (elementId: string) => {
    setAnnotatingElement(elementId);
    setAnnotationText(annotations[elementId] || '');
  };

  const handleSaveAnnotation = (elementId: string) => {
    setAnnotations(prev => ({
      ...prev,
      [elementId]: annotationText,
    }));
    onAnnotationSave?.(elementId, annotationText);
    setAnnotatingElement(null);
  };

  return (
    <div className="space-y-4">
      {/* Layer Controls */}
      {diagram.layers && diagram.layers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-natural-muted rounded-lg border border-natural-border">
          <div className="text-xs font-semibold text-natural-gray flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Show/Hide:
          </div>
          {diagram.layers.map(layer => (
            <button
              key={layer.id}
              onClick={() => handleLayerToggle(layer.id)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                visibleLayers.has(layer.id)
                  ? 'bg-natural-green text-white'
                  : 'bg-natural-border text-natural-gray'
              }`}
            >
              {visibleLayers.has(layer.id) ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
              {layer.name}
            </button>
          ))}
        </div>
      )}

      {/* SVG Canvas */}
      <div className="relative bg-natural-bg rounded-lg border border-natural-border overflow-hidden p-4">
        <svg
          ref={canvasRef}
          viewBox={`0 0 ${diagram.elements.reduce((max, el) => Math.max(max, el.x + 100), 400)} ${diagram.elements.reduce((max, el) => Math.max(max, el.y + 100), 400)}`}
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          {/* Render clickable areas for each element */}
          {visibleElements.map(element => (
            <g key={element.id}>
              {element.type === 'point' && (
                <motion.circle
                  cx={element.x}
                  cy={element.y}
                  r={element.type === 'point' ? 20 : 15}
                  fill={hoveredElement === element.id ? '#375531' : '#a8d5ba'}
                  fillOpacity={0.8}
                  stroke="#375531"
                  strokeWidth={2}
                  className="cursor-pointer"
                  onClick={() => setSelectedElement(element.id)}
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                  whileHover={{ r: 25, filter: 'drop-shadow(0 0 8px rgba(55, 85, 49, 0.4))' }}
                  animate={{ r: selectedElement === element.id ? 28 : 20 }}
                />
              )}

              {element.type === 'area' && (
                <motion.rect
                  x={element.x}
                  y={element.y}
                  width={100}
                  height={80}
                  fill={hoveredElement === element.id ? '#375531' : '#a8d5ba'}
                  fillOpacity={0.6}
                  stroke="#375531"
                  strokeWidth={2}
                  rx={8}
                  className="cursor-pointer"
                  onClick={() => setSelectedElement(element.id)}
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                  whileHover={{ fillOpacity: 0.8, filter: 'drop-shadow(0 0 8px rgba(55, 85, 49, 0.4))' }}
                  animate={{ fillOpacity: selectedElement === element.id ? 0.9 : 0.6 }}
                />
              )}

              {/* Label */}
              <text
                x={element.x}
                y={element.y + (element.type === 'point' ? 35 : 110)}
                textAnchor="middle"
                className="text-xs font-semibold fill-natural-green-dark pointer-events-none"
              >
                {element.label}
              </text>

              {/* Annotation indicator */}
              {annotations[element.id] && (
                <motion.circle
                  cx={element.x + 25}
                  cy={element.y - 15}
                  r={6}
                  fill="#375531"
                  className="cursor-help"
                  whileHover={{ r: 8 }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-natural-green/5 border border-natural-green/20 rounded-lg"
          >
            {visibleElements.find(el => el.id === selectedElement) && (
              <>
                <h3 className="font-semibold text-natural-green-dark mb-2">
                  {visibleElements.find(el => el.id === selectedElement)?.label}
                </h3>
                <p className="text-sm text-natural-gray mb-4">
                  {visibleElements.find(el => el.id === selectedElement)?.info}
                </p>

                {/* Annotation Section */}
                <div className="space-y-2">
                  {annotatingElement === selectedElement ? (
                    <div className="space-y-2">
                      <textarea
                        value={annotationText}
                        onChange={e => setAnnotationText(e.target.value)}
                        placeholder="Add your study notes..."
                        className="w-full p-2 text-sm rounded border border-natural-border bg-natural-bg text-natural-green-dark placeholder-natural-gray resize-none"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveAnnotation(selectedElement)}
                          className="text-xs px-3 py-1 bg-natural-green text-white rounded hover:bg-natural-green-dark transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setAnnotatingElement(null)}
                          className="text-xs px-3 py-1 bg-natural-border text-natural-gray rounded hover:bg-natural-muted transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartAnnotation(selectedElement)}
                      className="text-xs flex items-center gap-1 px-3 py-2 bg-natural-muted hover:bg-natural-border rounded transition-all text-natural-gray hover:text-natural-green-dark"
                    >
                      <MessageSquare className="w-3 h-3" />
                      {annotations[selectedElement] ? 'Edit Note' : 'Add Note'}
                    </button>
                  )}
                  {annotations[selectedElement] && annotatingElement !== selectedElement && (
                    <p className="text-xs italic text-natural-gray mt-2">📝 {annotations[selectedElement]}</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-natural-gray text-center">
        Click on any element to learn more and add your own notes
      </p>
    </div>
  );
}
