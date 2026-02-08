// Contenido detallado para páginas de servicios dedicadas (/services/[slug])

import { SERVICES } from "../../constants";

export interface ServicePageContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string[];
  documentsToBring: string[];
  process: Array<{ step: number; title: string; description: string }>;
  timing: { typical: string; details: string };
  pricing: { base: string; details: string; note?: string };
  faqs: Array<{ question: string; answer: string }>;
  relatedCitySlugs: string[];
}

const servicePages: Record<string, ServicePageContent> = {
  "mobile-notary": {
    slug: "mobile-notary",
    name: "Notario Móvil",
    metaTitle:
      "Servicios de Notario Móvil en el Área de la Bahía | Voy a Su Ubicación | Mobile Notary Management",
    metaDescription:
      "Servicios de notario móvil en toda el Área de la Bahía de San Francisco. Viajo a su hogar, oficina o cualquier ubicación 7 días a la semana. Citas el mismo día disponibles. $15 por firma.",
    heroTitle: "Servicios de Notario Móvil en Toda el Área de la Bahía",
    heroSubtitle:
      "Olvídese del viaje a una oficina de notario. Voy directamente a usted—a su hogar, oficina, cafetería o cualquier lugar en el Área de la Bahía. Citas el mismo día disponibles 7 días a la semana.",
    overview: [
      "Un notario móvil lleva servicios profesionales de notarización directamente a su ubicación, ahorrándole tiempo y molestias. En lugar de buscar una oficina notarial, ajustarse a sus horarios y conducir por toda la ciudad, yo voy a usted—donde sea que esté en el Área de la Bahía de San Francisco.",
      "Manejo todo tipo de documentos que requieren notarización: poderes notariales, escrituras de propiedad, declaraciones juradas, documentos de fideicomisos, directivas médicas, acuerdos comerciales y más. Como notario público comisionado de California, verifico su identidad, presencio su firma y aplico mi sello oficial—todo en un lugar y hora que le convenga.",
      "Ya sea que necesite notarizar una sola firma o una pila de documentos para una transacción inmobiliaria, proporciono el mismo servicio profesional y minucioso. Cada cita es atendida por mí personalmente—nunca lo transfiero a un desconocido.",
    ],
    documentsToBring: [
      "Identificación con foto vigente emitida por el gobierno (licencia de conducir, pasaporte o identificación estatal)",
      "El/los documento(s) a notarizar — NO los firme de antemano",
      "Cualquier firmante adicional que necesite estar presente",
      "Pago (efectivo, tarjeta, Venmo, Zelle o PayPal)",
    ],
    process: [
      {
        step: 1,
        title: "Contácteme",
        description:
          "Llame, envíe un mensaje de texto o reserve en línea. Déjeme saber qué documentos necesita notarizar, su ubicación y su hora preferida. Confirmaré disponibilidad—a menudo el mismo día.",
      },
      {
        step: 2,
        title: "Viajo a Su Ubicación",
        description:
          "Manejo hasta su ubicación elegida en cualquier parte del Área de la Bahía. Le enviaré un mensaje cuando esté en camino y llegaré a tiempo—sin esperar preguntándose cuándo apareceré.",
      },
      {
        step: 3,
        title: "Verifico y Notarizo",
        description:
          "Verifico su identidad con una identificación con foto válida, confirmo que entiende el documento y está firmando voluntariamente, luego presencio su firma y aplico mi sello notarial.",
      },
      {
        step: 4,
        title: "Listo — Todo Está Completo",
        description:
          "Todo el proceso típicamente toma 10-15 minutos por documento. Registro la transacción en mi diario notarial como lo requiere la ley de California, y está listo para continuar.",
      },
    ],
    timing: {
      typical: "10-15 minutos por documento",
      details:
        "La mayoría de las notarizaciones toman alrededor de 10-15 minutos. Si tiene múltiples documentos o un paquete de firma de préstamo, permita 30-60 minutos. Generalmente puedo llegar dentro de 1-3 horas para solicitudes del mismo día, dependiendo de su ubicación y mi horario.",
    },
    pricing: {
      base: "$15 por firma",
      details:
        "La ley de California establece la tarifa máxima de notario en $15 por firma. Las tarifas de viaje varían de $0-75 dependiendo de su distancia desde San Francisco y siempre se cotizan por adelantado antes de reservar.",
      note: "Las citas fuera de horario (después de las 6 PM) pueden incluir una pequeña tarifa adicional. Las citas de fin de semana no tienen cargo extra.",
    },
    faqs: [
      {
        question: "¿Qué es un notario móvil?",
        answer:
          "Un notario móvil es un notario público comisionado que viaja a su ubicación para realizar notarizaciones. En lugar de que usted vaya a una oficina, tienda UPS o banco, yo voy a usted—a su hogar, oficina, hospital o cualquier ubicación conveniente.",
      },
      {
        question: "¿Puede notarizar cualquier documento?",
        answer:
          "Puedo notarizar la mayoría de los documentos que requieren un sello notarial, incluyendo poderes notariales, escrituras, declaraciones juradas, contratos, directivas médicas y más. La ley de California tiene algunas restricciones—por ejemplo, no puedo notarizar registros vitales como certificados de nacimiento o defunción, o documentos en los que tengo un interés personal. Si no está seguro, llámeme y le informaré.",
      },
      {
        question: "¿Necesito firmar el documento antes de que usted llegue?",
        answer:
          "No—NO firme el documento antes de que yo llegue. Todo el propósito de la notarización es que yo presencie su firma. Si ya firmó, no puedo notarizarlo y puede necesitar obtener una nueva copia del documento.",
      },
      {
        question: "¿Puede proporcionar testigos?",
        answer:
          "Sí, puedo proporcionar testigos para documentos que los requieren, como testamentos o ciertos poderes notariales. Avíseme cuando reserve para que pueda hacer los arreglos necesarios.",
      },
      {
        question: "¿Qué pasa si no tengo una identificación válida?",
        answer:
          "La ley de California me requiere verificar su identidad antes de notarizar. Las identificaciones aceptables incluyen una licencia de conducir válida, identificación estatal, pasaporte o identificación militar. Si su identificación está vencida o no tiene una, llámeme para discutir métodos alternativos de identificación permitidos bajo la ley de California.",
      },
      {
        question: "¿Con cuánta anticipación necesito reservar?",
        answer:
          "Ofrezco servicio el mismo día la mayoría de los días y a menudo puedo llegar dentro de 1-3 horas. Para garantizar franjas horarias específicas, recomiendo reservar con al menos 24 horas de anticipación. Para situaciones urgentes—hospitales, asuntos legales urgentes—llámeme directamente y haré mi mejor esfuerzo para acomodarle.",
      },
      {
        question: "¿Trabaja los fines de semana y días festivos?",
        answer:
          "Estoy disponible 7 días a la semana, incluyendo sábados y domingos, sin cargo extra por fin de semana. Para días festivos importantes, la disponibilidad puede ser limitada—llame con anticipación para verificar.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "palo-alto",
      "fremont",
    ],
  },

  "loan-signing": {
    slug: "loan-signing",
    name: "Agente de Firma de Préstamos",
    metaTitle:
      "Agente de Firma de Préstamos en el Área de la Bahía | Certificado NNA | Mobile Notary Management",
    metaDescription:
      "Agente de firma de préstamos certificado por NNA sirviendo al Área de la Bahía de San Francisco. Refinanciamientos, compras, HELOC, hipotecas inversas. Respuesta rápida para compañías de títulos y prestatarios.",
    heroTitle: "Agente de Firma de Préstamos Certificado por NNA",
    heroSubtitle:
      "Firmas de préstamos profesionales y sin errores para refinanciamientos, compras, HELOC e hipotecas inversas. Confianza de compañías de títulos y prestatarios en toda el Área de la Bahía.",
    overview: [
      "Un agente de firma de préstamos es un notario público con capacitación especializada en documentos hipotecarios y de bienes raíces. Cuando compra una casa, refinancia o saca un préstamo sobre el valor líquido de la vivienda, alguien necesita guiarlo a través de la firma de su paquete de préstamo y notarizar los documentos requeridos. Eso es lo que hago.",
      "Como agente de firma certificado por NNA, he completado una capacitación exhaustiva sobre documentos hipotecarios, procedimientos de cierre y requisitos de cumplimiento. Las compañías de títulos, oficinas de custodia y prestamistas confían en mí para manejar sus paquetes de préstamos con precisión y profesionalismo—y los prestatarios aprecian tener a alguien que pueda explicar lo que están firmando en términos sencillos.",
      "Trabajo directamente con su compañía de títulos u oficial de custodia para coordinar la firma. Recibo el paquete de documentos, lo reviso para verificar que esté completo, viajo a su ubicación a la hora programada, lo guío a través de cada documento, notarizo las páginas requeridas y devuelvo el paquete completo—a menudo el mismo día.",
    ],
    documentsToBring: [
      "Identificación con foto vigente emitida por el gobierno para todos los prestatarios",
      "Una segunda forma de identificación si su prestamista lo especifica",
      "Cualquier documento que su oficial de custodia o compañía de títulos le pidió traer",
      "Pago por tarifas notariales (a menos que lo pague la compañía de títulos)",
    ],
    process: [
      {
        step: 1,
        title: "La Compañía de Títulos Me Contacta",
        description:
          "Su compañía de títulos, oficial de custodia o prestamista me envía el paquete de documentos del préstamo y los detalles de programación. También puede contactarme directamente si necesita un agente de firma.",
      },
      {
        step: 2,
        title: "Reviso el Paquete",
        description:
          "Antes de la cita, reviso todo el paquete de documentos para verificar páginas faltantes, errores o cualquier cosa que pueda causar demoras. Esta revisión previa ahorra tiempo durante la firma.",
      },
      {
        step: 3,
        title: "Nos Reunimos para la Firma",
        description:
          "Viajo a su hogar, oficina u otra ubicación conveniente. Lo guiaré a través de cada documento, explicaré lo que está firmando (sin ofrecer asesoramiento legal) y me aseguraré de que todo esté firmado y notarizado correctamente.",
      },
      {
        step: 4,
        title: "Paquete Devuelto el Mismo Día",
        description:
          "Después de la firma, envío el paquete completo de vuelta a la compañía de títulos—típicamente por mensajería nocturna el mismo día. Manejo toda la logística para que su cierre se mantenga en programa.",
      },
    ],
    timing: {
      typical: "45-90 minutos por firma",
      details:
        "Un refinanciamiento estándar toma alrededor de 45 minutos. Las transacciones de compra y firmas más complejas (hipotecas inversas, HELOC) típicamente toman 60-90 minutos. Nunca me apresuro con los documentos—cada prestatario merece tiempo para leer y hacer preguntas.",
    },
    pricing: {
      base: "$15 por firma/notarización",
      details:
        "Las tarifas notariales son $15 por firma según lo establece la ley de California. Las tarifas del agente de firma (para manejo de documentos, viaje y devolución del paquete) típicamente son pagadas por la compañía de títulos. Si es un prestatario organizando su propia firma, contácteme para una cotización completa.",
      note: "Compañías de títulos: Contácteme para precios por volumen y disponibilidad.",
    },
    faqs: [
      {
        question: "¿Cuál es la diferencia entre un notario y un agente de firma de préstamos?",
        answer:
          "Todos los agentes de firma de préstamos son notarios, pero no todos los notarios son agentes de firma de préstamos. Un agente de firma de préstamos tiene capacitación especializada en documentos hipotecarios y procedimientos de cierre. Estoy certificado por NNA, lo que significa que he pasado verificaciones de antecedentes y completé capacitación específicamente para manejar paquetes de préstamos.",
      },
      {
        question: "¿Puede explicarme los documentos del préstamo?",
        answer:
          "Puedo guiarlo a través de cada documento y explicar su propósito general—por ejemplo, 'Esta es su divulgación de Verdad en los Préstamos que muestra su tasa de interés y costo total del préstamo.' Sin embargo, no puedo ofrecer asesoramiento legal o financiero. Si tiene preguntas sobre sus términos específicos, le recomendaré contactar a su prestamista o abogado.",
      },
      {
        question: "¿Qué pasa si hay un error en mis documentos de préstamo?",
        answer:
          "Si detecto un error durante mi revisión previa o durante la firma, contactaré a su compañía de títulos u oficial de custodia inmediatamente. Muchos problemas pueden resolverse rápidamente con un documento corregido. Esta es una de las mayores ventajas de trabajar con un agente de firma experimentado—menos errores significa menos demoras.",
      },
      {
        question: "¿Necesitan estar presentes ambos cónyuges?",
        answer:
          "Si ambos nombres están en el préstamo, ambos prestatarios típicamente necesitan firmar. Puedo coordinar horarios para encontrar un momento que funcione para todos. En algunos casos, un cónyuge puede firmar mediante poder notarial—verifique primero con su compañía de títulos.",
      },
      {
        question: "¿Qué tan rápido puede manejar una firma?",
        answer:
          "A menudo puedo acomodar firmas el mismo día y al día siguiente. Para cierres de fin de mes y transacciones urgentes, priorizo hacer que sus documentos se firmen y devuelvan lo más rápido posible. Contácteme tan pronto sepa su fecha de cierre.",
      },
      {
        question: "¿Maneja hipotecas inversas?",
        answer:
          "Sí, tengo amplia experiencia con firmas de hipotecas inversas, que requieren paciencia y cuidado adicionales. Estas firmas típicamente toman 60-90 minutos, y me aseguro de que los prestatarios tengan suficiente tiempo para revisar y entender cada documento.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "palo-alto",
      "walnut-creek",
      "fremont",
    ],
  },

  apostille: {
    slug: "apostille",
    name: "Servicios de Apostilla",
    metaTitle:
      "Servicios de Apostilla de California | Área de la Bahía | Mobile Notary Management",
    metaDescription:
      "Servicios de apostilla de California para documentos usados internacionalmente. Certificados de nacimiento, diplomas, poderes notariales y más. Manejo todo el proceso por usted.",
    heroTitle: "Servicios de Apostilla de California",
    heroSubtitle:
      "¿Necesita documentos autenticados para uso internacional? Manejo todo el proceso de apostilla de California—desde la notarización hasta la presentación al Secretario de Estado y devolución.",
    overview: [
      "Una apostilla es un certificado oficial que autentica un documento para uso en otro país. Si necesita usar un documento estadounidense en el extranjero—para trabajo, escuela, matrimonio, bienes raíces o asuntos legales—la mayoría de los países que son parte de la Convención de La Haya requieren una apostilla en lugar de la legalización consular tradicional.",
      "El Secretario de Estado de California emite apostillas para documentos originados en California. El proceso implica hacer notarizar el documento (si no es ya un documento gubernamental certificado), presentarlo al Secretario de Estado con los formularios y tarifas correctos, y esperar el procesamiento. Yo manejo todos estos pasos por usted.",
      "Los documentos comunes que necesitan apostillas incluyen certificados de nacimiento, certificados de matrimonio, diplomas y expedientes académicos, poderes notariales, documentos corporativos y órdenes judiciales. Ya sea que necesite un documento o una docena, lo guiaré a través de los requisitos y manejaré todo el proceso de principio a fin.",
    ],
    documentsToBring: [
      "El/los documento(s) original(es) que necesitan una apostilla",
      "Identificación con foto emitida por el gobierno",
      "Información sobre el país de destino y propósito",
      "Cualquier copia certificada adicional necesaria",
    ],
    process: [
      {
        step: 1,
        title: "Consulta",
        description:
          "Contácteme con detalles sobre su documento y país de destino. Confirmaré si su documento califica para una apostilla y explicaré exactamente qué se necesita.",
      },
      {
        step: 2,
        title: "Notarización (Si Se Requiere)",
        description:
          "Algunos documentos necesitan ser notarizados antes de que se pueda emitir la apostilla. Manejaré la notarización en su ubicación. Las copias certificadas de registros vitales (certificados de nacimiento, matrimonio, defunción) van directamente al Secretario de Estado sin notarización separada.",
      },
      {
        step: 3,
        title: "Presentación al Secretario de Estado",
        description:
          "Preparo y presento sus documentos al Secretario de Estado de California junto con los formularios y tarifas requeridos. Rastrearé la presentación y lo mantendré actualizado sobre su estado.",
      },
      {
        step: 4,
        title: "Apostilla Devuelta a Usted",
        description:
          "Una vez que el Secretario de Estado procese sus documentos (típicamente 5-10 días hábiles para procesamiento estándar), le entregaré los documentos apostillados de vuelta.",
      },
    ],
    timing: {
      typical: "5-10 días hábiles (procesamiento estándar)",
      details:
        "El procesamiento estándar a través del Secretario de Estado de California toma alrededor de 5-10 días hábiles. El procesamiento acelerado (2-3 días hábiles) está disponible por una tarifa estatal adicional. El procesamiento el mismo día puede estar disponible para presentaciones en persona en Sacramento. El cronograma total incluyendo notarización, presentación y devolución es típicamente de 1-2 semanas.",
    },
    pricing: {
      base: "Llame para una cotización",
      details:
        "Los precios de apostilla dependen del número de documentos, si se requiere notarización y su velocidad de procesamiento preferida. El Secretario de Estado de California cobra $20 por apostilla. Proporciono una cotización completa cubriendo todas las tarifas—notarización, tarifas estatales, envío y mi tarifa de servicio—antes de que se comprometa.",
      note: "Procesamiento urgente disponible para situaciones urgentes.",
    },
    faqs: [
      {
        question: "¿Qué es una apostilla?",
        answer:
          "Una apostilla es un certificado emitido por el Secretario de Estado de California que autentica un documento para uso en otro país. Es reconocida por todos los países que son miembros de la Convención de Apostilla de La Haya (más de 120 países). Piénselo como un sello internacional de aprobación que verifica que el documento es legítimo.",
      },
      {
        question: "¿Cuánto tiempo toma el proceso de apostilla?",
        answer:
          "El procesamiento estándar es de 5-10 días hábiles a través del Secretario de Estado. Con procesamiento acelerado, puede hacerse en 2-3 días hábiles por una tarifa adicional. Incluyendo el tiempo para notarización, presentación y entrega de devolución, el proceso total típicamente toma 1-2 semanas.",
      },
      {
        question:
          "¿Necesito hacer notarizar mi documento antes de obtener una apostilla?",
        answer:
          "Depende del tipo de documento. Las copias certificadas de registros vitales (certificados de nacimiento, matrimonio, defunción) y documentos que ya llevan la firma de un funcionario estatal pueden ir directamente al Secretario de Estado. Los documentos privados como poderes notariales, declaraciones juradas y documentos corporativos típicamente necesitan notarización primero. Le asesoraré sobre exactamente qué se necesita.",
      },
      {
        question: "¿Puede apostillar un certificado de nacimiento?",
        answer:
          "¡Sí! Los certificados de nacimiento emitidos por un registrador del condado de California pueden ser apostillados directamente por el Secretario de Estado. Necesitará una copia certificada oficial—no una fotocopia. Si necesita obtener una copia certificada primero, puedo guiarlo a través de ese proceso también.",
      },
      {
        question: "¿Qué países aceptan apostillas?",
        answer:
          "Más de 120 países aceptan apostillas bajo la Convención de La Haya, incluyendo la mayor parte de Europa, Japón, Corea del Sur, Australia, Brasil, México, India y muchos más. Algunos países (incluyendo China, Canadá y algunas naciones del Medio Oriente) no son miembros de La Haya y requieren un proceso de autenticación diferente llamado legalización de embajada. Contácteme con su país de destino y confirmaré qué se necesita.",
      },
      {
        question: "¿Puede apostillar un diploma o expediente académico?",
        answer:
          "Sí. Los diplomas universitarios y expedientes académicos de instituciones de California pueden ser apostillados. El proceso típicamente requiere que el documento sea notarizado primero, luego presentado al Secretario de Estado. Manejo todo el proceso por usted.",
      },
      {
        question: "¿Qué pasa si mi documento es de otro estado?",
        answer:
          "El Secretario de Estado de California solo puede apostillar documentos que se originan en California o son notarizados por un notario de California. Si su documento es de otro estado, necesitaría ser apostillado por el Secretario de Estado de ese estado. Puedo ayudar con la porción de California y asesorar sobre procesos fuera del estado.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "fremont",
      "sunnyvale",
    ],
  },

  "hospital-notary": {
    slug: "hospital-notary",
    name: "Notario para Hospitales y Centros de Cuidado",
    metaTitle:
      "Servicios de Notario en Hospitales del Área de la Bahía | Centro de Cuidado | Mobile Notary Management",
    metaDescription:
      "Servicios de notario compasivos en hospitales, hogares de ancianos e instalaciones de vida asistida en el Área de la Bahía. Programación prioritaria para situaciones urgentes. Disponible 7 días a la semana.",
    heroTitle: "Servicios de Notario en Hospitales y Centros de Cuidado",
    heroSubtitle:
      "Notarización compasiva y discreta en hospitales, hogares de ancianos e instalaciones de vida asistida. Programación prioritaria disponible para situaciones urgentes.",
    overview: [
      "Cuando un ser querido está en el hospital o un centro de cuidado, las necesidades de notarización no esperan. Poderes notariales, directivas médicas, documentos de sucesión y otros papeles legales a menudo necesitan ser firmados con urgencia—y la persona que necesita firmarlos no puede viajar fácilmente a una oficina notarial.",
      "Proporciono servicios de notario móvil en hospitales, hogares de ancianos, centros de rehabilitación e instalaciones de vida asistida en toda el Área de la Bahía. Entiendo la sensibilidad de estas situaciones y abordo cada cita con paciencia, compasión y discreción. Trabajo alrededor de horarios de visita, horarios médicos y las limitaciones físicas de pacientes y residentes.",
      "Si enfrenta una situación urgente—un padre que necesita firmar un poder notarial antes de una cirugía, o documentos de sucesión que no pueden esperar—llámeme directamente. Ofrezco programación prioritaria y a menudo puedo llegar dentro de horas, incluso en las tardes y fines de semana.",
    ],
    documentsToBring: [
      "Identificación con foto vigente para el firmante (el paciente o residente)",
      "El/los documento(s) a notarizar — sin firmar",
      "Información de contacto del abogado o familiar que preparó los documentos",
      "Cualquier requisito específico de la instalación (pase de visitante, protocolos COVID, etc.)",
    ],
    process: [
      {
        step: 1,
        title: "Llámeme Directamente",
        description:
          "Para visitas a hospitales y centros de cuidado, recomiendo llamar en lugar de reservar en línea. Esto me permite entender la urgencia, la condición del firmante y cualquier requisito específico de la instalación para poder prepararme apropiadamente.",
      },
      {
        step: 2,
        title: "Coordino con la Instalación",
        description:
          "Trabajaré alrededor de horarios de visita y cualquier regla de la instalación. Si es necesario, puedo coordinar con el personal de enfermería o trabajadores sociales para encontrar el mejor momento para la firma. Vengo preparado y no tomaré más tiempo del necesario.",
      },
      {
        step: 3,
        title: "Evaluación del Paciente",
        description:
          "Antes de notarizar, debo confirmar que el firmante está alerta, consciente y firmando voluntariamente. Este es un requisito legal. Evalúo su capacidad para entender el documento y comunicar sus deseos. Si tengo preocupaciones, las discutiré en privado con la familia.",
      },
      {
        step: 4,
        title: "Notarización con Cuidado",
        description:
          "Manejo la firma eficientemente pero nunca me apresuro. Acomodo limitaciones físicas—por ejemplo, si alguien no puede sostener un bolígrafo, puedo discutir alternativas. Mantengo una presencia calmada y profesional en todo momento.",
      },
    ],
    timing: {
      typical: "15-30 minutos junto a la cama",
      details:
        "La notarización real toma alrededor de 15-30 minutos, pero siempre permito tiempo extra para visitas a hospitales y centros de cuidado. El tiempo de viaje a la instalación es adicional. Para situaciones urgentes, a menudo puedo llegar dentro de 1-3 horas de su llamada.",
    },
    pricing: {
      base: "$15 por firma",
      details:
        "Las tarifas notariales son $15 por firma según la ley de California, más una tarifa de viaje basada en la ubicación de la instalación. Las visitas a hospitales y centros de cuidado durante horas regulares no tienen recargo adicional. Las visitas fuera de horario pueden incluir una pequeña tarifa adicional.",
      note: "Nunca cobro de más a familias en situaciones difíciles. El precio que cotizo es el precio que paga.",
    },
    faqs: [
      {
        question:
          "¿Puede alguien en el hospital firmar documentos legales?",
        answer:
          "Sí, siempre que la persona esté alerta, consciente de lo que está firmando y firmando voluntariamente. Estoy capacitado para evaluar la capacidad de un firmante y me aseguraré de que se cumplan todos los requisitos legales. Si el firmante está fuertemente sedado o no puede comunicarse, puede que necesitemos esperar o explorar alternativas con su abogado.",
      },
      {
        question:
          "¿Qué pasa si mi familiar no puede firmar físicamente su nombre?",
        answer:
          "La ley de California permite alternativas si alguien no puede firmar su nombre debido a limitaciones físicas. Pueden hacer una marca (como una 'X') en presencia de testigos, o dirigir a otra persona para que firme en su nombre. Llámeme para discutir la situación específica—generalmente hay opciones.",
      },
      {
        question: "¿Visita pacientes en la UCI?",
        answer:
          "Sí, puedo visitar pacientes en UCI, pero depende de las políticas de la instalación y la condición del paciente. Coordinaré con el personal de enfermería para encontrar un momento apropiado. Las visitas a UCI requieren sensibilidad y flexibilidad extra—he manejado muchas de estas situaciones.",
      },
      {
        question: "¿Puede venir a un hogar de ancianos o instalación de vida asistida?",
        answer:
          "Absolutamente. Visito regularmente hogares de ancianos, instalaciones de vida asistida e instalaciones de cuidado de memoria en toda el Área de la Bahía. Estoy familiarizado con los requisitos y el ritmo necesario para estos entornos.",
      },
      {
        question: "¿Qué pasa con COVID u otros protocolos de control de infecciones?",
        answer:
          "Sigo todos los protocolos de control de infecciones de la instalación. Llevo desinfectante de manos, puedo usar mascarilla si se requiere y cumpliré con cualquier requisito de detección, vacunación o pruebas que la instalación tenga vigente.",
      },
      {
        question: "¿Qué tan rápido puede venir para una visita urgente al hospital?",
        answer:
          "Para situaciones urgentes, ofrezco programación prioritaria y a menudo puedo llegar dentro de 1-3 horas, incluso en las tardes y fines de semana. Llámeme directamente al (510) 393-1860 en lugar de reservar en línea—esta es la forma más rápida de programar una visita urgente.",
      },
      {
        question:
          "¿A qué hospitales presta servicio?",
        answer:
          "Presto servicio a todos los hospitales e instalaciones de cuidado en el Área de la Bahía de San Francisco, incluyendo UCSF, ubicaciones de Kaiser, Stanford Medical Center, John Muir Health, instalaciones de Sutter Health, Regional Medical Center y muchos más. Si hay una instalación en el Área de la Bahía, puedo llegar allí.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "walnut-creek",
      "hayward",
    ],
  },
};

// Export the content constant
export const SERVICE_PAGE_CONTENT = servicePages;

export function getServicePageContent(
  slug: string
): ServicePageContent | null {
  return servicePages[slug] || null;
}

export function getAllServicePageSlugs(): string[] {
  return Object.keys(servicePages);
}

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
