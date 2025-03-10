import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Menu, Award, Instagram, Clock, Users, Sparkles, ClipboardList, CalendarCheck, CheckCircle, ShieldCheck, PenTool, Briefcase, Eye, HardHat } from 'lucide-react';
import YouTubePlayer from './components/YouTubePlayer';
import Logo2 from '../src/assets/logo2.png';
import ImageComparison from "./components/ImageComparison";
import PhotoSlider from "./components/PhotoSlider";
import emailjs from '@emailjs/browser';
import imgtexto from '../src/assets/IMG_01.jpg'
import fundo1 from '../src/assets/FUNDO V1.png'
import fundo2 from '../src/assets/FUNDO V2.png'

// CSS para o fundo com animação
import './index.css'; // Certifique-se de que o CSS está importado

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
      transition={{ duration: 0.8 }}
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
    }
  ];
  const form = useRef<HTMLFormElement>(null);
  const [, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.current) {
        await emailjs.sendForm(
          'service_wp9q7pe',
          'template_7ehwa7c',
          form.current,
          'QCv7x6qbx04dK9m7Q'
        );

        setFormStatus('success');
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          mensagem: ''
        });
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormStatus('error');
    }
  };

  const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <header className="w-full p-4 flex justify-between items-center bg-transparent">
        <img src={Logo2} alt="Logo" className="w-24 md:w-32 opacity-90" />
        <nav className="hidden md:flex space-x-8 text-white items-center ml-auto">
          <a href="#diferenciais" className="nav-link">Diferenciais</a>
          <a href="#feedbacks" className="nav-link">Feedbacks</a>
          <a href="#Servicos" className="nav-link">Serviços</a>
          <a href="#Sobre" className="nav-link">Sobre</a>
        </nav>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
        {isOpen && (
          <div className="absolute top-16 right-4 p-4 rounded-lg shadow-lg bg-gray-800 md:hidden z-20">
            <nav className="flex flex-col space-y-4 text-white">
              <a href="#diferenciais" className="nav-link">Diferenciais</a>
              <a href="#feedbacks" className="nav-link">Feedbacks</a>
              <a href="#Servicos" className="nav-link">Serviços</a>
              <a href="#Sobre" className="nav-link">Sobre</a>
            </nav>
          </div>
        )}
      </header>
    );
  };

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

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-gray-200 pb-6">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-center"
        >
          <h3 className="text-xl font-semibold mb-2">{question}</h3>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && <p className="text-gray-600">{answer}</p>}
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <Section className="relative pt-[5px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fundo2})`,
            filter: 'brightness(0.3)',
          }}
        />
        <div className="font-sans relative">
          <div className="relative z-0">
            <Header />
            <div className="relative z-10 flex items-start w-full">
              <div className="w-full px-1 md:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="text-white">
                    <p className="text-xl mb-3">Reforma e Construção de Alto Padrão</p>
                    <h1 className="text-[36px] md:text-[52px] font-bold leading-tight mb-4">
                      A sua obra entregue no prazo, e com <br className="hidden md:inline" />
                      qualidade garantida
                    </h1>
                    <p className="text-xl mb-8">
                      Na Altus Engenharia, somos especialistas em <strong>construções e reformas de alto padrão</strong>. Nosso compromisso é cuidar de toda a obra para você, com <strong>transparência, qualidade e cumprimento de prazos</strong>, para que você possa focar na sua rotina sem preocupações.
                    </p>
                    <a href="#video">
                      <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Entenda porque a Altus é diferente!
                      </button>
                    </a>
                  </div>
                  <div className="form-container">
                    <h2 className="form-title">Fale com um especialista</h2>
                    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                          type="text"
                          name="from_name"
                          id="nome"
                          required
                          className="form-input"
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="telefone" className="form-label">Telefone</label>
                        <input
                          type="tel"
                          name="phone"
                          id="telefone"
                          required
                          className="form-input"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          className="form-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="mensagem" className="form-label">Mensagem</label>
                        <textarea
                          id="mensagem"
                          name="message"
                          rows={4}
                          required
                          className="form-textarea"
                          value={formData.mensagem}
                          onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="form-button">
                        Solicitar Contato
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div id='video' className='text-3xl font-bold text-center mb-0'>
          <h1>Sobre a Altus</h1>
        </div>
        <div className="flex flex-col items-center">
          {/* Para vídeo horizontal 16:9 */}
          <div className="relative w-full max-w-3xl overflow-hidden" style={{ paddingTop: '5%' }}> {/* 16:9 */}
            <YouTubePlayer videoId="5JZ2rlNg82Q" aspectRatio="16/9" />
          </div>
        </div>
      </Section>

      {/* Differentials Section */}
      <div id="diferenciais"></div>
      <Section>
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Por que a Altus Engenharia é a escolha certa para sua obra?</h2>
          <p className="text-xl mb-8">
            Entendemos que uma obra pode ser estressante: prazos que se estendem, orçamentos que fogem do controle e falta de transparência. <br className="hidden md:inline" />
            Por isso, trabalhamos com um processo claro e eficiente.
          </p>
          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {[
              { icon: ClipboardList, title: "Gestão Profissional", desc: "Planejamento detalhado e execução impecável, garantindo que cada etapa da obra seja realizada com eficiência e organização." },
              { icon: CalendarCheck, title: "Diário de Obra", desc: "Acompanhamento em tempo real da evolução da obra, com atualizações constantes para que você saiba exatamente o que está acontecendo." },
              { icon: CheckCircle, title: "Cumprimento de Prazos", desc: "Sua obra entregue no prazo combinado, sem atrasos e com a qualidade que você espera." },
              { icon: Eye, title: "Transparência Total", desc: "Orçamento claro e sem surpresas. Você sabe exatamente o que está pagando e por quê." },
              { icon: Briefcase, title: "Comodidade Total", desc: "Cuidamos de tudo, desde a compra dos materiais até a entrega final. Você pode relaxar ou até viajar enquanto transformamos seu espaço." },
              { icon: HardHat, title: "Mão de Obra Qualificada", desc: "Contamos com os melhores profissionais do mercado, garantindo agilidade, qualidade e atenção aos detalhes em cada etapa da obra." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <Icon className="w-12 h-12 mb-4 text-[#DAA84B]" /> {/* Aplicando a cor dourada */}
                <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
          {/* Botão centralizado */}
          <div className="mt-8">
            <a href="#orcamento">
              <button className="bg-[#DAA84B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#eab308] transition-colors">
                Quero um orçamento
              </button>
            </a>
          </div>
        </div>
      </Section>
      {/* Testimonials Section */}
      <Section>
        <div id="feedbacks" className="container mx-auto px-4">
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

      {/* Pain Points Section */}
      <Section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Por que a Altus Engenharia é diferente?
          </h2>
          <div className="mb-16"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-4">Problemas Comuns</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Atrasos constantes
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Orçamentos furados
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Falta de transparência
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Desorganização da obra
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Falta de comunicação
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Incomodação excessiva
                </li>
              </ul>
            </div>
            <div className="bg-gray-900 text-white p-8 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-4">Solução Altus</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Cumprimento rigoroso de prazos
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Orçamento transparente
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Transparência total
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Gestão profissional
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Comunicação constante
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Comodidade e segurança
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition-colors">
              Quero começar minha obra!
            </button>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section>
        <div id="Servicos" className="container mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-8">Nossos Projetos</h2>
          <div className="flex flex-col gap-16">
            {beforeAfterProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full flex flex-col items-center"
              >
                <h3 className="text-2xl font-semibold text-center">{project.title}</h3>
                <div className="w-full md:w-3/4 lg:w-2/3 shadow-lg rounded-lg">
                  <ImageComparison beforeImageSrc={project.before} afterImageSrc={project.after} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-8">Sonhos que já realizamos</h1>
          <PhotoSlider />
        </div>
      </Section>
      <Section>
        <div id='Sobre' className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-gray-500 text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl transition-transform transform hover:scale-105">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Título à esquerda com padding no topo */}
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold text-left">
                    Oferecemos soluções completas para construção e reforma, do alicerce ao acabamento.
                  </h2>
                  {/* Imagem abaixo do título */}
                  <img src={Logo2} alt="Descrição da Imagem" className="w-200 h-500 object-cover rounded-md mt-2" />
                </div>
                {/* Texto à direita */}
                <p className="text-lg text-left">
                  Desde o planejamento inicial, desenvolvemos um cronograma detalhado, garantindo que todas as etapas sejam executadas dentro do prazo. Nossa mão de obra qualificada é composta por profissionais experientes e capacitados, que trabalham com precisão e dedicação para transformar seu sonho em realidade. Com a Altus Engenharia, você tem a certeza de uma obra entregue no prazo, sem surpresas e com a qualidade que só nós oferecemos. Deixe a burocracia e os imprevistos com a gente e foque no que realmente importa: desfrutar do seu espaço dos sonhos. 🏗️✨
                </p>
              </div>
              {/* Ícone do Instagram */}
              <div className="flex justify-center mt-4">
                <a href="https://www.instagram.com/altusengenhariabh/" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* FAQ Section */}
      <Section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
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
                <a href="https://www.instagram.com/altusengenhariabh/" className="text-white hover:text-gray-300">
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
            <p>&copy; 2025 Altus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;