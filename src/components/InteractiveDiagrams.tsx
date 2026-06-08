import { useState } from 'react';
import { motion } from 'motion/react';
import InteractiveDiagram from './InteractiveDiagram';
import SEO from './SEO';
import { cellDiagram, photosynthesisDiagram, bondingDiagram, dnaReplicationDiagram } from '../data/diagrams';

const diagramsList = [
  { id: 'cell', name: 'Animal Cell', diagram: cellDiagram, subject: 'biologie' },
  { id: 'photosynthesis', name: 'Photosynthesis', diagram: photosynthesisDiagram, subject: 'biologie' },
  { id: 'bonding', name: 'Chemical Bonding', diagram: bondingDiagram, subject: 'chimie' },
  { id: 'dna', name: 'DNA Replication', diagram: dnaReplicationDiagram, subject: 'biologie' },
];

export default function InteractiveDiagrams() {
  const [selectedDiagram, setSelectedDiagram] = useState(diagramsList[0]);

  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
      <SEO title="Interactive Diagrams" description="Explore interactive biology and chemistry diagrams" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-green-dark mb-2">
            Interactive Diagrams
          </h1>
          <p className="text-natural-gray">
            Click on diagram elements to learn more. Add your own study notes!
          </p>
        </div>

        {/* Diagram Selector */}
        <div className="flex flex-wrap gap-3 justify-center">
          {diagramsList.map(item => (
            <motion.button
              key={item.id}
              onClick={() => setSelectedDiagram(item)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedDiagram.id === item.id
                  ? 'bg-natural-green text-white'
                  : 'bg-natural-muted text-natural-gray hover:bg-natural-border'
              }`}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Subject Tag */}
        <div className="text-center">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            selectedDiagram.subject === 'biologie'
              ? 'bg-natural-green/10 text-natural-green'
              : 'bg-natural-earth/10 text-natural-earth'
          }`}>
            {selectedDiagram.subject === 'biologie' ? '🧬 Biology' : '⚗️ Chemistry'}
          </span>
        </div>

        {/* Diagram Container */}
        <motion.div
          key={selectedDiagram.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-natural-card rounded-lg border border-natural-border p-6"
        >
          <InteractiveDiagram
            diagram={selectedDiagram.diagram}
            onAnnotationSave={(elementId, annotation) => {
              console.log(`Saved annotation for ${elementId}:`, annotation);
              // In a real app, save to database
            }}
          />
        </motion.div>

        {/* Instructions */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-natural-muted rounded-lg p-4">
            <h3 className="font-semibold text-natural-green-dark mb-2">🖱️ Explore</h3>
            <p className="text-sm text-natural-gray">Hover over elements to highlight them. Click to see detailed information.</p>
          </div>
          <div className="bg-natural-muted rounded-lg p-4">
            <h3 className="font-semibold text-natural-green-dark mb-2">📝 Annotate</h3>
            <p className="text-sm text-natural-gray">Add personal study notes to any element. Your notes are saved automatically.</p>
          </div>
          <div className="bg-natural-muted rounded-lg p-4">
            <h3 className="font-semibold text-natural-green-dark mb-2">🔄 Toggle Layers</h3>
            <p className="text-sm text-natural-gray">Some diagrams have layers you can show/hide to focus on specific systems.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
