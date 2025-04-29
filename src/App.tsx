import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
import './index.css';

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
      title: "Residêncial Amendoeiras",
      executionYear: "2025",
      deliveryDeadline: "1 ano",
      builtArea: "300"
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
    <div className="font-sans pt-16">
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
              <a href="#orcamento">
                <button className="bg-[#DAA84B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#eab308] transition-colors">
                  Garantir entrega no prazo
                </button>
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div id='Sobre' className='text-3xl font-bold text-center mb-0'>
          <h1>Sobre a Altus</h1>
        </div>
        <div id='video' className="flex flex-col items-center px-4 w-full">
          <YouTubeAPIProvider>
            <div className="relative w-full max-w-3xl overflow-hidden max-sm:max-w-md" style={{ paddingTop: '5%' }}>
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
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="mb-6">
                    <img
                      src={Logo2}
                      alt="Logo Altus Engenharia"
                      className="w-40 md:w-48 mx-auto md:mx-0 mb-4 object-contain"
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                      Oferecemos soluções completas para construção e reforma, do alicerce ao acabamento.
                    </h2>
                  </div>
                </div>

                {/* Right Column with Text */}
                <div className="space-y-4">
                  <p className="text-lg font-medium">
                    Planejamento rigoroso, equipe especializada e materiais premium:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                      <span>Cronograma detalhado com etapas monitoradas para evitar atrasos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                      <span>Mão de obra qualificada certificada em técnicas de alta precisão</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                      <span>Gestão de imprevistos integrada (burocracias e desafios técnicos resolvidos por nós)</span>
                    </li>
                  </ul>
                  <p className="text-lg pt-2">
                    Deixe conosco a complexidade da obra e receba um espaço que reflete seu padrão, sem preocupações.
                  </p>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="flex justify-center mt-8 md:mt-10">
                <a
                  href="https://www.instagram.com/altusengenhariabh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram className="text-[#DAA84B] w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* Fotos */}
      <Section>
        <div id="Servicos" className="container mx-auto px-4 md:px-8 lg:px-20 overflow-hidden text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Sonhos que já realizamos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Conheça alguns dos projetos que realizamos com maestria.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <PhotoSlider />
        </div>
        <div className="flex justify-center items-center">
          <a href="#orcamento">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition-colors">
              Quero começar minha obra!
            </button>
          </a>
        </div>
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
              {/* Gestão Profissional (Branco) */}
              <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="mb-5 text-4xl">📊</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Gestão Profissional</h3>
                <p className="text-gray-600 mb-4">
                  Planejamento minucioso e acompanhamento diário para garantir prazos e orçamentos sem surpresas.
                </p>
                <ul className="text-gray-600 text-left space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>Cronogramas detalhados</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>Controle financeiro transparente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>Acompanhamento em tempo real</span>
                  </li>
                </ul>
              </div>

              {/* Qualidade Garantida (Dourado - Destaque) */}
              <div className="text-center p-8 bg-[#DAA84B] rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="mb-5 text-4xl">🏆</div>
                <h3 className="text-xl font-bold text-white mb-3">Qualidade Garantida</h3>
                <p className="text-white text-opacity-90 mb-4">
                  Mão de obra especializada para resultados que impressionam. Respeitando sempre os prazos e custos.
                </p>
                <ul className="text-white text-opacity-90 text-left space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-white mr-2 mt-1 flex-shrink-0" />
                    <span className="text-white">Acabamentos impecáveis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-white mr-2 mt-1 flex-shrink-0" />
                    <span className="text-white">Equipes certificadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-white mr-2 mt-1 flex-shrink-0" />
                    <span className="text-white">Inspeções de qualidade semanais</span>
                  </li>
                </ul>
              </div>

              {/* Experiência Personalizada (Branco) */}
              <div className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="mb-5 text-4xl">🤝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Experiência Personalizada</h3>
                <p className="text-gray-600 mb-4">
                  Atendimento exclusivo do projeto à entrega, com comunicação clara e relatórios semanais.
                </p>
                <ul className="text-gray-600 text-left space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>1 engenheiro dedicado por obra</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>Atualizações frequentes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#DAA84B] mr-2 mt-1 flex-shrink-0" />
                    <span>Soluções sob medida</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Botão centralizado */}
        <div className="mt-8 text-center">
          <a href="#orcamento">
            <button className="bg-[#DAA84B] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#eab308] transition-colors">
              Quero um orçamento
            </button>
          </a>
        </div>
      </Section >

      {/* Testimonials Section */}
      < Section >
        <div id="feedbacks" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Confira o que os clientes dizem sobre a experiência Altus Engenharia</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Primeiro vídeo */}
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
              <div id="video" className="flex flex-col items-center px-4 w-full">
                <YouTubeAPIProvider>
                  <div className="relative w-full max-w-xs overflow-hidden max-sm:max-w-sm" style={{ paddingTop: '5%' }}>
                    <YouTubePlayer videoId="XykPrqgO5OQ" aspectRatio="9/16" />
                  </div>
                </YouTubeAPIProvider>
              </div>
              <p className="text-black italic mt-4 text-center">
                "A Altus superou todas as nossas expectativas. Profissionalismo e excelência do início ao fim."
              </p>
              <p className="mt-4 font-semibold">Cliente 1</p>
            </div>

            {/* Segundo vídeo */}
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col items-center">
              <div id="video" className="flex flex-col items-center px-4 w-full">
                <YouTubeAPIProvider>
                  <div className="relative w-full max-w-xs overflow-hidden max-sm:max-w-sm" style={{ paddingTop: '5%' }}>
                    <YouTubePlayer videoId="fUi3JVMepmQ" aspectRatio="9/16" />
                  </div>
                </YouTubeAPIProvider>
              </div>
              <p className="text-black italic mt-4 text-center">
                "A Altus superou todas as nossas expectativas. Profissionalismo e excelência do início ao fim."
              </p>
              <p className="mt-4 font-semibold">Cliente 2</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <a href="#orcamento">
              <button className="bg-black text-[#DAA84B] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition-colors">
                Quero viver a experiência Altus!
              </button>
            </a>
          </div>
        </div>
      </Section >

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
        <div id="Antes e depois" className="container px-4 md:px-8 lg:px-20 overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 break-words">Antes e depois</h2>
          <div className="flex flex-col gap-16">
            {beforeAfterProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="w-full flex flex-col items-center gap-8"
              >
                {/* Container da imagem centralizada */}
                <div className="w-full flex flex-col items-center">
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg rounded-lg overflow-hidden">
                    <ImageComparison beforeImageSrc={project.before} afterImageSrc={project.after} />
                  </div>

                  {/* Títulos centralizados */}
                  <div className="text-center mt-4 space-y-1">
                    <h3 className="text-xl font-semibold">Apartamento Bairro Prado</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      {/* Form Section */}
      < Section className="" >
        <div id="orcamento" className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Solicite um Orçamento</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    name="from_name"
                    id="nome"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B]"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="telefone"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B]"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-gray-700 mb-2">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAA84B]"
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#DAA84B] text-white py-3 rounded-lg font-semibold hover:bg-[#eab308] transition-colors"
                >
                  Solicitar Contato
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section >

      {/* FAQ Section */}
      < Section >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section >

      {/* Footer */}
      < footer className="bg-black text-white py-10" >
        <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center gap-4">
          {/* Logo */}
          <img src={Logo2} alt="Altus" className="w-32 mb-4" />
          {/* Navegação */}
          <nav className="flex space-x-6 text-lg text-[#DAA84B]">
            <a href="#Sobre" className="hover:underline">Sobre</a>
            <a href="#orcamento" className="hover:underline">Serviços</a>
            <a href="#Servicos" className="hover:underline">Portfólio</a>
          </nav>
          {/* Ícones Redes Sociais */}
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/altusengenhariabh/" className="text-[#DAA84B] hover:text-gray-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#DAA84B] hover:text-gray-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-[#DAA84B] hover:text-gray-300">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
        {/* Linha divisória e Direitos Autorais */}
        <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm">
          <p>&copy; 2025 Altus. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2 text-[#DAA84B]">
            <a href="#" className="hover:underline">Política de Privacidade</a>
            <a href="#" className="hover:underline">Termos de Uso</a>
          </div>
        </div>
      </footer >
    </div >
  );
}

export default App;