import { admissionInfo } from '../data/admission';
import { FileText, Calendar, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import Accordion from './ui/Accordion';

export default function Admission() {

  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-natural-green-dark mb-6">Ghidul de Admitere 2026</h1>
        <p className="max-w-2xl mx-auto text-natural-gray text-lg">Tot ce trebuie să știi despre procesul de înscriere, documente și calendarul examenului.</p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-12">
          {/* Programe de studiu */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8 text-natural-green-dark">Programe de Studiu</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {admissionInfo.programs.map((program) => (
                <div key={program.id} className="bg-natural-card p-8 rounded-3xl border border-natural-border hover:shadow-lg transition-all border-natural-border/50">
                   <h3 className="text-xl font-bold mb-2 text-natural-green-dark">{program.name}</h3>
                   <span className="inline-block px-3 py-1 bg-natural-green/10 text-natural-green text-[10px] font-bold rounded-full mb-4">{program.duration}</span>
                   <p className="text-sm text-natural-gray mb-6 leading-relaxed">{program.description}</p>
                   <div className="flex justify-between border-t border-natural-border pt-4">
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-natural-gray uppercase">Locuri Buget</p>
                        <p className="text-lg font-bold text-natural-green-dark">{program.seats.budget}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-natural-gray uppercase">Locuri Taxă</p>
                        <p className="text-lg font-bold text-natural-green-dark">{program.seats.tax}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cerințe și Acte */}
          <section className="bg-natural-muted p-10 rounded-[40px] border border-natural-border/50">
            <h2 className="text-3xl font-serif font-bold mb-8 text-natural-green-dark">Cerințe și Acte Necesare</h2>
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-natural-green rounded-full flex items-center justify-center text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold">Dosarul de Înscriere</h4>
                  </div>
                  <ul className="space-y-3">
                    {admissionInfo.requirements.documents.map((doc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-natural-gray">
                        <CheckCircle2 className="w-4 h-4 text-natural-green mt-0.5 shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-natural-earth rounded-full flex items-center justify-center text-white">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold">Calendarul Admiterii</h4>
                  </div>
                  <div className="space-y-4">
                    {admissionInfo.requirements.timeline.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-24 shrink-0">
                           <p className="text-[10px] font-bold text-natural-earth uppercase">{item.date}</p>
                        </div>
                        <p className="text-sm text-natural-gray font-medium">{item.event}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
           <div className="bg-natural-green-dark p-8 rounded-[40px] text-white shadow-2xl shadow-natural-green-dark/20 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-natural-green" />
                </div>
                <h3 className="text-xl font-bold">Întrebări Frecvente</h3>
              </div>
              <div className="space-y-1">
                <Accordion items={admissionInfo.faq} />
              </div>
           </div>

        </aside>
      </div>
    </div>
  );
}
