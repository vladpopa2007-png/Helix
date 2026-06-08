import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from './SEO';

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center bg-natural-bg">
      <SEO 
        title="Pagina Negăsită - 404" 
        description="Pagina pe care o cauți nu există."
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md w-full"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <div className="text-8xl font-serif font-bold text-natural-green/20 mb-4">
              404
            </div>
          </motion.div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-green-dark mb-4">
          Pagina Negăsită
        </h1>
        
        <p className="text-natural-gray text-lg mb-8">
          Din păcate, pagina pe care o cauți nu există. Poate a fost mutată sau ștearsă.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-natural-green text-white rounded-lg font-bold hover:bg-natural-green-dark transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Înapoi Acasă
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-natural-muted text-natural-green hover:bg-natural-border rounded-lg font-bold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Înapoi
          </button>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 text-natural-gray text-sm"
        >
          💡 Încearcă să navighezi folosind meniul principal.
        </motion.div>
      </motion.div>
    </div>
  );
}
