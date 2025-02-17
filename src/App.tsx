import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Clock, PenTool as Tool, Users, Award, Instagram, Sparkles } from 'lucide-react';
import YouTubePlayer from './components/YouTubePlayer';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function App() {
  const beforeAfterProjects = [
    {
      before: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      title: "Residência Alto de Pinheiros"
    },
    {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      after: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      title: "Apartamento Jardins"
    },
  ];

  const faqs = [
    {
      question: "Como funciona o acompanhamento da obra?",
      answer: "Oferecemos um acompanhamento detalhado e transparente através de nosso sistema de gestão exclusivo. Você terá acesso a relatórios diários, fotos e updates em tempo real do progresso da sua obra."
    },
    {
      question: "Quais os diferenciais da Altus em relação a outras empresas?",
      answer: "A Altus se destaca pela gestão rigorosa, equipe altamente qualificada e compromisso com prazos. Nosso diferencial está na execução impecável, organização exemplar e comunicação transparente durante todo o processo."
    },
    {
      question: "Qual o prazo médio para cada tipo de projeto?",
      answer: "O prazo varia de acordo com a complexidade e escopo do projeto. Após a análise inicial, estabelecemos um cronograma detalhado e nos comprometemos com sua execução precisa."
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <Section className="min-h-screen relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503387762-592deb58ef4e)',
            filter: 'brightness(0.3)'
          }}
        />

        <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Execução de obra sem dores de cabeça: Qualidade, Exclusividade e Gestão Rigorosa
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Transformamos seu projeto em realidade com excelência e precisão.
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Quero um orçamento exclusivo
              </button>
            </div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <YouTubePlayer videoId="zkcjDmi_siQ" />
            </div>
          </div>
        </div>
      </Section>

      {/* Rest of the sections remain unchanged */}
      {/* Pain Points Section */}
      <Section className="bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Cansado de obras atrasadas, sujas, desorganizadas e sem acompanhamento?
          </h2>
          <div className="mb-16">
            <img
              src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15"
              alt="Contraste de organização"
              className="w-full max-h-[500px] md:max-h-[600px] object-cover rounded-lg shadow-lg"
            />

          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Problemas Comuns</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Atrasos constantes
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Falta de organização
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Comunicação precária
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 text-white p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Solução Altus</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Cumprimento rigoroso de prazos
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Gestão profissional e organizada
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Comunicação transparente
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">O que nossos clientes dizem</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Depoimento em Vídeo {i}</span>
                </div>
                <p className="text-gray-600 italic">
                  "A Altus superou todas as nossas expectativas. Profissionalismo e excelência do início ao fim."
                </p>
                <p className="mt-4 font-semibold">Cliente {i}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Differentials Section */}
      <Section className="bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Por que escolher a Altus?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Pontualidade", desc: "Entrega no prazo prometido" },
              { icon: Users, title: "Equipe Qualificada", desc: "Profissionais especializados" },
              { icon: Tool, title: "Gestão Completa", desc: "Acompanhamento em tempo real" },
              { icon: Sparkles, title: "Organização Impecável", desc: "Limpeza e ordem em toda a obra" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <Icon className="w-12 h-12 mx-auto mb-4 text-gray-900" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section className="bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Nossos Projetos</h2>
          <div className="flex flex-col gap-16">
            {beforeAfterProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? 100 : -100 }} 
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={`w-full flex flex-col items-center ${i % 2 === 0 ? "md:items-start" : "md:items-end"}`}
              >
                <h3 className="text-2xl font-semibold text-center md:text-left">{project.title}</h3>

                <div className="flex gap-4 w-full md:w-3/4 lg:w-2/3 justify-center">
                  <div className="w-1/2 text-center">
                    <p className="text-lg text-gray-500 mb-2">Antes</p>
                    <img
                      src={project.before}
                      alt="Antes"
                      className="w-full h-auto md:h-64 object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
                    />
                  </div>

                  <div className="w-1/2 text-center">
                    <p className="text-lg text-gray-500 mb-2">Depois</p>
                    <img
                      src={project.after}
                      alt="Depois"
                      className="w-full h-auto md:h-64 object-cover rounded-lg shadow-lg transition-transform hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>


      {/* FAQ Section */}
      <Section className="bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Altus</h4>
              <p className="text-gray-400">
                Excelência em gestão e execução de obras de alto padrão.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contato</h4>
              <p className="text-gray-400">contato@altus.com.br</p>
              <div className="flex items-center mt-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6" />
                <span className="text-sm">Compromisso com qualidade e sustentabilidade</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Altus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;