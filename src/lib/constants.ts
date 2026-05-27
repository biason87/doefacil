/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DONATION_POINTS = [
  {
    id: 1,
    name: "Hemonúcleo de Sorocaba (Colsan)",
    lat: -23.5135,
    lng: -47.4580,
    address: "Av. Comendador Pereira Inácio, 564 - Jd. Vergueiro",
    city: "Sorocaba",
    status: "Normal",
    phone: "(15) 3233-1444"
  },
  {
    id: 2,
    name: "Hospital Santa Lucinda",
    lat: -23.5140,
    lng: -47.4571,
    address: "Rua Cláudio Manoel da Costa, 57 - Jd. Vergueiro",
    city: "Sorocaba",
    status: "Crítico (O-)",
    phone: "(15) 3212-9900"
  },
  {
    id: 3,
    name: "Hemocentro de Sorocaba",
    lat: -23.4975,
    lng: -47.4589,
    address: "Rua Dr. Braguinha, 332 - Centro",
    city: "Sorocaba",
    status: "Urgente (A+)",
    phone: "(15) 3231-1555"
  }
];

export const URGENT_NEEDS = [
  {
    id: 1,
    hospital: "Santa Casa de Misericórdia de Sorocaba",
    bloodType: "O-",
    description: "Estoque crítico. Necessidade imediata para pronto-socorro.",
    level: "Crítico"
  },
  {
    id: 2,
    hospital: "Hospital Regional de Sorocaba",
    bloodType: "A+",
    description: "Baixo estoque de plaquetas. Doadores necessários.",
    level: "Urgente"
  }
];

export const CAMPAIGNS = [
  {
    id: 1,
    title: "Junho Vermelho",
    description: "Campanha nacional de incentivo à doação de sangue durante o mês de junho. Vista-se de esperança e doe vida.",
    date: "Junho 2026",
    image: "/src/assets/images/regenerated_image_1777557623525.png"
  },
  {
    id: 2,
    title: "Doe Esperança",
    description: "Evento especial de coleta externa no Parque do Ibirapuera. Venha fazer a diferença na vida de alguém.",
    date: "15 de Maio, 2026",
    image: "/src/assets/images/regenerated_image_1777557625124.png"
  },
  {
    id: 3,
    title: "Sangue Jovem",
    description: "Incentivo para novos doadores universitários. Ganhe um kit exclusivo e ajude a salvar até 4 vidas.",
    date: "20 de Maio, 2026",
    image: "/src/assets/images/regenerated_image_1777557626287.png"
  },
  {
    id: 4,
    title: "Doação Coletiva",
    description: "Traga sua equipe ou grupo de amigos para doar juntos. Agendamentos especiais para grupos acima de 5 pessoas.",
    date: "Todo Sábado",
    image: "/src/assets/images/regenerated_image_1777893885280.png"
  }
];

export const CHAT_FAQS = [
  {
    question: "Quem pode doar sangue?",
    answer: "Pessoas entre 16 e 69 anos, pesando mais de 50kg, com bom estado de saúde e descanso adequado."
  },
  {
    question: "Quanto tempo dura a doação?",
    answer: "O processo todo, desde o cadastro até o lanche pós-doação, dura cerca de 60 minutos. A coleta em si leva de 8 a 12 minutos."
  },
  {
    question: "Qual o intervalo entre doações?",
    answer: "Homens podem doar a cada 2 meses (máximo 4x/ano) e mulheres a cada 3 meses (máximo 3x/ano)."
  },
  {
    question: "Grávidas podem doar?",
    answer: "Não. Gestantes e mulheres que estão amamentando (até 12 meses após o parto) devem aguardar."
  }
];

export const GUIDE_FAQS = [
  {
    question: "Posso doar se estiver tomando medicamentos?",
    answer: "Depende do remédio. Antibióticos geralmente exigem espera de 15 dias após o término. Sempre informe a equipe médica sobre qualquer uso de medicação."
  },
  {
    question: "Quantos litros de sangue são retirados na doação?",
    answer: "São coletados aproximadamente 450ml por doação. Isso representa menos de 10% do volume total de sangue de um adulto médio."
  },
  {
    question: "Existe risco de contrair doenças ao doar sangue?",
    answer: "Nenhum risco. Todo o material utilizado (agulhas, bolsas, kits) é estéril, descartável e de uso único. Não há qualquer possibilidade de contaminação."
  },
  {
    question: "O que devo comer antes de ir doar?",
    answer: "Procure fazer uma refeição leve e saudável. Evite alimentos gordurosos (como frituras e leite integral) nas 3 horas que antecedem a doação. Nunca doe em jejum."
  },
  {
    question: "Fiz uma tatuagem recentemente, posso doar?",
    answer: "Sim, porém é necessário aguardar um período de 12 meses após a realização da tatuagem ou piercing para garantir a segurança dos protocolos de saúde."
  }
];
