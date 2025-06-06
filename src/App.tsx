import React, { useState, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Menu, Award, Instagram, Clock, Users, Sparkles, ClipboardList, CalendarCheck, CheckCircle, ShieldCheck, PenTool, Briefcase, Eye, HardHat, MapPin, Hourglass, Ruler, Facebook, MessageCircle } from 'lucide-react';
import YouTubePlayer from './components/YouTubePlayer';
import { YouTubeAPIProvider } from './components/YouTubeAPIProvider';
import Logo2 from '../src/assets/Logo Altus dorada-Photoroom.png';
import ImageComparison from "./components/ImageComparison";
import PhotoSlider from "./components/PhotoSlider";
import emailjs from '@emailjs/browser';
import imgtexto from '../src/assets/IMG_01.jpg'
import fundo1 from '../src/assets/FUNDO V1.png'
import fundo2 from '../src/assets/FUNDO V2.png'
import antes1 from '../src/assets/Em breve branco.png'
import depois1 from '../src/assets/Em breve preto.png'
import LocationSection from './components/LocationSection'
import './index.css';

// Remove the shiny button class
const shinyButtonClass = "bg-[#DAA84B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#eab308] transition-colors";

// Add animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

// Update Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const beforeAfterProjects = [
    {
      before: antes1,
      after: depois1,
      title: "Residêncial Amendoeiras",
      executionYear: "2025",
      deliveryDeadline: "1 ano",
      builtArea: "300"
    }
  ];
  const form = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    mensagem: '',
    person_type: '',
    project_type: '',
    location: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('idle');

    // Construir o objeto de parâmetros manualmente
    const templateParams = {
      to_name: 'Altus Engenharia',
      name: formData.nome,
      whatsapp: formData.telefone,
      email: formData.email,
      project_details: formData.mensagem,
      location: formData.location,
      person_type: formData.person_type,
      project_type: formData.project_type,
    };

    try {
      // Usar emailjs.send com o objeto de parâmetros
      await emailjs.send(
        'service_eh3fwwp',
        'template_8hrcx2e',
        templateParams,
        'B2EZKyeGy9AUZwq5L'
      );

      setFormStatus('success');
      // Limpar o formulário
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        mensagem: '',
        person_type: '',
        project_type: '',
        location: '',
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setFormStatus('error');
    }
  };

  const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <header className="w-full bg-black bg-opacity-90 fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <img src={Logo2} alt="Logo" className="w-16 md:w-20 opacity-90" />

          {/* Navegação Desktop */}
          <nav className="hidden md:flex space-x-6 text-white items-center text-sm">
            <a href="#Sobre" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Sobre</a>
            <a href="#Servicos" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Serviços</a>
            <a href="#feedbacks" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Feedbacks</a>
            <a href="#orcamento" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Orçamento</a>
          </nav>

          {/* Menu Mobile */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <Menu size={20} />
          </button>

          {isOpen && (
            <div className="absolute top-16 right-4 p-4 rounded-lg shadow-lg bg-gray-800 md:hidden z-20">
              <nav className="flex flex-col space-y-4 text-white">
                <a href="#Sobre" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Sobre</a>
                <a href="#Servicos" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Serviços</a>
                <a href="#feedbacks" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Feedbacks</a>
                <a href="#orcamento" className="relative text-white transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Orçamento</a>
              </nav>
            </div>
          )}
        </div>
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
    {
      question: "Qual o valor médio de uma reforma?",
      answer: "O valor varia conforme o tamanho, complexidade e materiais escolhidos. Reformas de alto padrão podem partir de <strong>R$ 2.500/m²</strong>, mas o investimento é personalizado para cada projeto."
    },
    {
      question: "Vocês fazem projetos arquitetônicos?",
      answer: "Sim! Temos parceria com arquitetos especializados em projetos de alto padrão. Se você já tem um arquiteto, integramos nosso trabalho ao dele. Se não tem, ajudamos a encontrar o profissional ideal para seu projeto."
    }
  ];

  function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="border-b border-gray-200 pb-6"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex justify-between items-center"
        >
          <h3 className="text-xl font-semibold mb-2">{question}</h3>
          <span>{isOpen ? '-' : '+'}</span>
        </div>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600"
          >
            {answer}
          </motion.p>
        )}
      </motion.div>
    );
  }

  const openModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setModalContent({
        title: 'Política de Privacidade',
        content: (
          <div className="space-y-6 text-gray-300">
            <p className="leading-relaxed">
              A Atlus Engenharia respeita a sua privacidade e está comprometida com a proteção dos dados pessoais fornecidos por você ao utilizar nosso site.
            </p>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Coleta de Informações</h3>
              <p className="mb-4">Ao preencher nosso formulário de contato, coletamos as seguintes informações:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">
                <li>Nome completo</li>
                <li>Telefone</li>
                <li>E-mail</li>
                <li>Mensagem</li>
              </ul>
              <p className="mb-4">Esses dados são utilizados exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Entrar em contato com você, caso solicitado;</li>
                <li>Responder dúvidas, orçamentos ou outras solicitações enviadas por meio do formulário;</li>
                <li>Melhorar nosso atendimento e os serviços oferecidos.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Armazenamento e Segurança dos Dados</h3>
              <p className="leading-relaxed">
                Seus dados são armazenados com segurança e não são compartilhados, vendidos ou divulgados a terceiros, exceto quando exigido por lei. Adotamos medidas técnicas e administrativas para garantir a proteção dessas informações.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Direitos do Usuário</h3>
              <p className="leading-relaxed">
                Você pode, a qualquer momento, solicitar a atualização, correção ou exclusão dos seus dados pessoais, entrando em contato conosco pelo e-mail informado no site.
              </p>
            </div>
          </div>
        )
      });
    } else {
      setModalContent({
        title: 'Termos de Uso',
        content: (
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Uso do Site</h3>
              <p className="leading-relaxed">
                O uso do site da Atlus Engenharia implica na aceitação total dos termos descritos nesta página. O conteúdo do site é destinado exclusivamente para fins informativos e de contato com a empresa.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Responsabilidades</h3>
              <p className="leading-relaxed">
                O usuário se compromete a fornecer informações verídicas ao preencher o formulário de contato. A Atlus Engenharia não se responsabiliza por dados incorretos fornecidos pelo usuário.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Propriedade Intelectual</h3>
              <p className="leading-relaxed">
                Todo o conteúdo presente neste site — textos, imagens, logos e demais elementos — é de propriedade da Atlus Engenharia, sendo proibida a reprodução ou uso sem autorização prévia.
              </p>
            </div>
          </div>
        )
      });
    }
    setModalOpen(true);
  };

  return (
    <div className="font-sans pt--3 overflow-x-hidden">
      <Header />
      {/* Hero Section */}
      <Section className="relative">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fundo2})`,
            filter: 'brightness(0.3)',
          }}
        />

        {/* Conteúdo da Section */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-11">
          <div className="grid md:grid-cols-1 gap-12">
            {/* Texto */}
            <div className="text-white text-center">
              <p className="text-xl mb-3 leading-snug">Reforma e Construção de Alto Padrão</p>
              <h1 className="text-[30px] sm:text-[36px] md:text-[52px] font-bold leading-tight mb-4 max-w-3xl mx-auto">
                A sua obra entregue no prazo e com qualidade garantida
              </h1>
              <p className="text-lg sm:text-xl mb-6 leading-relaxed max-w-3xl mx-auto">
                Muito além das obras, entregamos experiências de alto padrão com excelência em engenharia,
                personalização única e respeito a cada detalhe da sua jornada — da concepção à entrega,
                sem preocupações.
              </p>
              <div className="flex flex-col items-center gap-12">
                <a href="#orcamento">
                  <button className={shinyButtonClass}>
                    Garantir entrega no prazo
                  </button>
                </a>
                
                {/* Scroll Indicator Animation */}
                <div className="flex justify-center">
                  <div className="w-8 h-12 border-2 border-white rounded-full relative flex justify-center">
                    <div className="w-2 h-2 bg-white rounded-full absolute animate-scrollDown" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div id='Sobre' className='text-3xl font-bold text-center mb-0'>
          <h1>Sobre a Altus</h1>
        </div>
        <div id='video' className="flex flex-col items-center px-4 w-full max-w-full">
          <YouTubeAPIProvider>
            <div className="relative w-full max-w-3xl overflow-hidden" style={{ paddingTop: '5%' }}>
              <YouTubePlayer videoId="zkcjDmi_siQ" aspectRatio="16/9" />
            </div>
          </YouTubeAPIProvider>
        </div>
      </Section>

      {/* Sobre */}
      <Section className="py-12 md:py-16 lg:py-20">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl">
            <div className="bg-transparent text-gray-800 p-6 md:p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Column with Logo and Title */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 0.2
                    }}
                    viewport={{ once: true }}
                    className="mb-6"
                  >
                    <motion.img
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      src={Logo2}
                      alt="Logo Altus Engenharia"
                      className="w-40 md:w-48 mx-auto md:mx-0 mb-4 object-contain"
                    />
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-2xl sm:text-3xl font-bold leading-tight"
                    >
                      Oferecemos soluções completas para construção e reforma, do alicerce ao acabamento.
                    </motion.h2>
                  </motion.div>
                </motion.div>

                {/* Right Column with Text */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg font-medium"
                  >
                    Planejamento rigoroso, equipe especializada e materiais premium:
                  </motion.p>
                  <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-3"
                  >
                    {[
                      "Cronograma detalhado com etapas monitoradas para evitar atrasos",
                      "Mão de obra qualificada certificada em técnicas de alta precisão",
                      "Gestão de imprevistos integrada (burocracias e desafios técnicos resolvidos por nós)"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + (index * 0.2) }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                    className="text-lg pt-2"
                  >
                    Deixe conosco a complexidade da obra e receba um espaço que reflete seu padrão, sem preocupações.
                  </motion.p>
                </motion.div>
              </div>

              {/* Instagram Icon */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
                className="flex justify-center mt-8 md:mt-10"
              >
                <a
                  href="https://www.instagram.com/altusengenhariabh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram className="text-[#DAA84B] w-8 h-8" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
      {/* Fotos */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id="Servicos" 
          className="container mx-auto px-4 md:px-8 lg:px-20 overflow-hidden text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Sonhos que já realizamos
          </motion.h2>          
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mb-8"
        >
          <PhotoSlider />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.6,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
          className="flex justify-center items-center"
        >
          <a href="#orcamento">
            <button className={shinyButtonClass}>
              Quero começar minha obra!
            </button>
          </a>
        </motion.div>
      </Section>
      {/* Differentials Section */}
      <div id="diferenciais"></div>
      <Section>
        <div className="container max-w-4xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-15 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Por que a Altus Engenharia é a escolha certa para sua obra?
          </h2>
          {/*  <p className="text-lg md:text-base mb-8">
            Entendemos que uma obra pode ser estressante: prazos que se estendem, orçamentos que fogem do controle e falta de transparência. <br className="hidden md:inline" />
            Por isso, trabalhamos com um processo claro e eficiente.
          </p> */}
        </div>
        {/* Seção Serviços - Destaque Central Dourado */}
        <div className="bg-transparent py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
              {[
                {
                  icon: <ClipboardList className="w-8 h-8 text-[#DAA84B]" />,
                  title: "Gestão Profissional",
                  description: "Planejamento minucioso e acompanhamento diário para garantir prazos e orçamentos sem surpresas.",
                  items: ["Cronogramas detalhados", "Controle financeiro transparente", "Acompanhamento em tempo real"]
                },
                {
                  icon: <Award className="w-8 h-8 text-white" />,
                  title: "Qualidade Garantida",
                  description: "Mão de obra especializada para resultados que impressionam. Respeitando sempre os prazos e custos.",
                  items: ["Acabamentos impecáveis", "Equipes certificadas", "Inspeções de qualidade semanais"]
                },
                {
                  icon: <Users className="w-8 h-8 text-[#DAA84B]" />,
                  title: "Experiência Personalizada",
                  description: "Atendimento exclusivo do projeto à entrega, com comunicação clara e relatórios semanais.",
                  items: ["1 engenheiro dedicado por obra", "Atualizações frequentes", "Soluções sob medida"]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`text-center p-8 ${index === 1 ? 'bg-[#DAA84B]' : 'bg-white'} rounded-lg shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="mb-5 flex justify-center">
                    <div className={`p-3 ${index === 1 ? 'bg-white/10' : 'bg-[#DAA84B]/10'} rounded-full`}>
                      {service.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${index === 1 ? 'text-white' : 'text-gray-800'} mb-3`}>
                    {service.title}
                  </h3>
                  <p className={`${index === 1 ? 'text-white' : 'text-gray-600'} mb-4`}>
                    {service.description}
                  </p>
                  <ul className={`${index === 1 ? 'text-white' : 'text-gray-600'} text-left space-y-2`}>
                    {service.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <CheckCircle2 className={`${index === 1 ? 'text-white' : 'text-[#DAA84B]'} mr-2 mt-1 flex-shrink-0`} />
                        <span className={index === 1 ? 'text-white' : ''}>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* Botão centralizado */}
        <div className="mt-8 text-center">
          <a href="#orcamento">
            <button className={shinyButtonClass}>
              Quero um orçamento
            </button>
          </a>
        </div>
      </Section >

      {/* Testimonials Section */}
      <Section>
        <div id="feedbacks" className="container mx-auto px-4 max-w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Confira o que os clientes dizem sobre a experiência Altus Engenharia
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Primeiro vídeo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="p-8 rounded-lg shadow-lg flex flex-col items-center"
            >
              <div id="video" className="flex flex-col items-center px-4 w-full">
                <YouTubeAPIProvider>
                  <div className="relative w-full max-w-xs overflow-hidden max-sm:max-w-sm" style={{ paddingTop: '5%' }}>
                    <YouTubePlayer videoId="XykPrqgO5OQ" aspectRatio="9/16" />
                  </div>
                </YouTubeAPIProvider>
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-withe italic mt-4 text-center"
              >
                "A Altus superou todas as nossas expectativas. Profissionalismo e excelência do início ao fim."
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-4 font-semibold"
              >
                Cliente 1
              </motion.p>
            </motion.div>

            {/* Segundo vídeo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="p-8 rounded-lg shadow-lg flex flex-col items-center"
            >
              <div id="video" className="flex flex-col items-center px-4 w-full">
                <YouTubeAPIProvider>
                  <div className="relative w-full max-w-xs overflow-hidden max-sm:max-w-sm" style={{ paddingTop: '5%' }}>
                    <YouTubePlayer videoId="fUi3JVMepmQ" aspectRatio="9/16" />
                  </div>
                </YouTubeAPIProvider>
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-withe italic mt-4 text-center"
              >
                "A Altus superou todas as nossas expectativas. Profissionalismo e excelência do início ao fim."
              </motion.p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-4 font-semibold"
              >
                Cliente 2
              </motion.p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center items-center"
          >
            <a href="#orcamento">
              <button className={shinyButtonClass}>
                Quero viver a experiência Altus!
              </button>
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Pain Points Section */}
      {/* < Section >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Por que a Altus Engenharia é diferente?
          </h2>
          <div className="mb-10"></div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="bg-gray-100 p-6 rounded-lg mb-8 w-3/4 mx-auto">
              <h3 className="text-xl text-black font-semibold mb-4">Problemas Comuns</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Atrasos no prazo de entrega
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Orçamentos estourados
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Falta de transparência
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Obra desorganizada e suja
                </li>
                <li className="flex items-center text-red-600">
                  <span className="mr-2">✕</span> Incomodação excessiva
                </li>
              </ul>
            </div> */}
      {/*   <div className="bg-gray-900 text-white p-6 rounded-lg mb-8 w-3/4 mx-auto"> 
              <h3 className="text-xl font-semibold mb-4">Solução Altus</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Todas as entregas dentro do Prazo
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Orçamentos transparentes e sem surpresas
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Atualização da sua obra em tempo real
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Equipe qualificada e organizada
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" /> Comodidade e segurança para você e sua família
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section > */}
      {/* Projects Section */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id="Antes e depois" 
          className="max-w-4xl mx-auto px-4 md:px-8 lg:px-20 overflow-hidden"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 break-words"
          >
            Antes e depois
          </motion.h2>
          <div className="flex flex-col gap-16 items-center">
            {beforeAfterProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 50,
                  delay: i * 0.3
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full flex flex-col items-center gap-8"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.2
                  }}
                  viewport={{ once: true }}
                  className="w-full"
                >
                  <div 
                    className="w-full overflow-hidden shadow-lg rounded-lg"
                  >
                    <ImageComparison beforeImageSrc={project.before} afterImageSrc={project.after} />
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.4
                  }}
                  viewport={{ once: true }}
                  className="text-center mt-4 space-y-1"
                >
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-xl font-semibold"
                  >
                    Apartamento Bairro Prado
                  </motion.h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
      {/* Form Section */}
      <Section className="py-16">
        <div id="orcamento" className="container mx-auto px-4 max-w-full">
          <div className="flex flex-col md:flex-row gap-12 items-start max-w-6xl mx-auto">
            {/* Texto à esquerda */}
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white-800">
                  Pronto para transformar seu projeto em realidade?
                </h2>
                <div className="w-20 h-1 bg-[#DAA84B]"></div>
                <p className="text-lg text-white-600">
                  Preencha o formulário abaixo e nossa equipe entrará em contato em até 24h para criar uma solução sob medida, com qualidade Altus e zero dor de cabeça.
                </p>
              </div>
              <div className="hidden md:flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-[#DAA84B] w-6 h-6" />
                  <span className="text-white-700">Orçamento personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-[#DAA84B] w-6 h-6" />
                  <span className="text-white-700">Resposta em até 24h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-[#DAA84B] w-6 h-6" />
                  <span className="text-white-700">Atendimento exclusivo</span>
                </div>
              </div>
            </div>

            {/* Formulário à direita */}
            <div className="md:w-1/2 w-full">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100">
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      name="name"
                      id="nome"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B] focus:border-transparent transition-all"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      id="telefone"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B] focus:border-transparent transition-all"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B] focus:border-transparent transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Quem é você?</label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="person_type"
                          value="Cliente"
                          required
                          className="form-radio text-[#DAA84B] focus:ring-2 focus:ring-[#DAA84B]"
                          checked={formData.person_type === 'Cliente'}
                          onChange={(e) => setFormData({ ...formData, person_type: e.target.value })}
                        />
                        <span className="ml-2 text-gray-700">Cliente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="person_type"
                          value="Arquiteta"
                          required
                          className="form-radio text-[#DAA84B] focus:ring-2 focus:ring-[#DAA84B]"
                          checked={formData.person_type === 'Arquiteta'}
                          onChange={(e) => setFormData({ ...formData, person_type: e.target.value })}
                        />
                        <span className="ml-2 text-gray-700">Arquiteta</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Tipo de Obra:</label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="project_type"
                          value="Construção"
                          required
                          className="form-radio text-[#DAA84B] focus:ring-2 focus:ring-[#DAA84B]"
                          checked={formData.project_type === 'Construção'}
                          onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                        />
                        <span className="ml-2 text-gray-700">Construção</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="project_type"
                          value="Reforma"
                          required
                          className="form-radio text-[#DAA84B] focus:ring-2 focus:ring-[#DAA84B]"
                          checked={formData.project_type === 'Reforma'}
                          onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                        />
                        <span className="ml-2 text-gray-700">Reforma</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Localização (bairro e cidade)</label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B] focus:border-transparent transition-all"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ex: Centro, Belo Horizonte"
                    />
                  </div>
                  <div>
                    <label htmlFor="mensagem" className="block text-gray-700 font-medium mb-2">Mensagem</label>
                    <textarea
                      id="mensagem"
                      name="project_details"
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B] focus:border-transparent transition-all"
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Conte-nos sobre seu projeto..."
                    />
                  </div>
                  <input type="hidden" name="to_name" value="Altus Engenharia" />
                  <button
                    type="submit"
                    className={shinyButtonClass}
                  >
                    Solicitar Contato
                  </button>
                </form>
                {formStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Sucesso!</strong>
                    <span className="block sm:inline"> Mensagem enviada com sucesso. Entraremos em contato em breve!</span>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Erro!</strong>
                    <span className="block sm:inline"> Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* Mapa do Google Maps */}
      <Section>
        <div className="flex justify-center w-full">
          <LocationSection />
        </div>
      </Section>
      {/* FAQ Section */}
      <Section>
        <div id="faq" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </Section>
      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 max-w-full">
          {/* Grid Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Coluna 1 - Logo e Descrição */}
            <div className="space-y-6">
              <img src={Logo2} alt="Altus" className="w-32" />
              <p className="text-gray-400 text-sm">
                Excelência em engenharia e construção de alto padrão. 
                Transformando sonhos em realidade com qualidade e pontualidade.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/altusengenhariabh/" 
                   className="text-[#DAA84B] hover:text-white transition-colors"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/altusengenharia" 
                   className="text-[#DAA84B] hover:text-white transition-colors"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://wa.me/5531998641351" 
                   className="text-[#DAA84B] hover:text-white transition-colors"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-[#DAA84B]">Menu</h3>
              <nav className="space-y-4">
                <a href="#Sobre" className="block text-gray-400 hover:text-white transition-colors">Sobre</a>
                <a href="#Servicos" className="block text-gray-400 hover:text-white transition-colors">Serviços</a>
                <a href="#feedbacks" className="block text-gray-400 hover:text-white transition-colors">Feedbacks</a>
                <a href="#orcamento" className="block text-gray-400 hover:text-white transition-colors">Orçamento</a>
              </nav>
            </div>

            {/* Coluna 3 - Serviços */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-[#DAA84B]">Nossos Serviços</h3>
              <ul className="space-y-4 text-gray-400">
                <li>Construção de Alto Padrão</li>
                <li>Reformas e Retrofits</li>
                <li>Gerenciamento de Obras</li>
                <li>Projetos Arquitetônicos</li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-[#DAA84B]">Contato</h3>
              <div className="space-y-4">
                <p className="text-gray-400">
                  <strong className="text-white">Endereço:</strong><br />
                  Av. Professor Mário Werneck, 2170, Sala 802/803<br />
                  Buritis, Belo Horizonte - MG 
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">Telefone:</strong><br />
                  (31) 99864-1351
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">Email:</strong><br />
                  altusengenhariabh@gmail.com
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">CNPJ:</strong><br />
                  54.592.488/0001-12
                </p>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Altus Engenharia. Todos os direitos reservados.
              </p>
              <div className="flex space-x-6 text-sm">
                <button 
                  onClick={() => openModal('privacy')}
                  className="text-gray-400 hover:text-white transition-colors bg-transparent border-none p-0"
                >
                  Política de Privacidade
                </button>
                <button 
                  onClick={() => openModal('terms')}
                  className="text-gray-400 hover:text-white transition-colors bg-transparent border-none p-0"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent?.title || ''}
      >
        {modalContent?.content}
      </Modal>
    </div >
  );
}

export default App;