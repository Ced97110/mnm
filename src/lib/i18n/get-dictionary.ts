import type { Locale } from './config';

// Dictionary type for UI strings
export interface Dictionary {
  nav: {
    home: string;
    services: string;
    serviceAreas: string;
    blog: string;
    about: string;
    contact: string;
    pricing: string;
    faq: string;
  };
  hero: {
    badge: string;
    title: string;
    titleLocation: string;
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
    };
    trust: {
      licensed: string;
      bilingual: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    cta: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
    };
  };
  serviceAreas: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    viewReviews: string;
    stats: {
      documents: string;
      experience: string;
      rating: string;
      reviews: string;
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    notaryServices: string;
    stateGuidelines: string;
    standardDescription: string;
    additionalCharges: string;
    additionalDescription: string;
    fees: {
      realEstate: string;
      wills: string;
      trusts: string;
      loanSignings: string;
      powerOfAttorney: string;
      affidavits: string;
      divorce: string;
      acknowledgments: string;
      apostille: string;
      apostilleDescription: string;
      perSignature: string;
      callForInfo: string;
      travelLabel: string;
      travelDescription: string;
      afterHoursLabel: string;
      afterHoursDescription: string;
      sameDayLabel: string;
      sameDayDescription: string;
      exceptionalLabel: string;
      exceptionalDescription: string;
    };
    transparencyNote: string;
    bookAppointment: string;
    calculateTravel: string;
    calculateSubtitle: string;
    paymentNote: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    callButton: string;
    textButton: string;
    contactNote: string;
    noObligation: string;
    fastResponse: string;
    formTitle: string;
    formSubtitle: string;
    formName: string;
    formPhone: string;
    formService: string;
    formServicePlaceholder: string;
    formServices: {
      mobileNotary: string;
      loanSigning: string;
      apostille: string;
      hospital: string;
      other: string;
    };
    formLocation: string;
    formSubmit: string;
    formDisclaimer: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    description: string;
    contactMe: string;
    services: string;
    resources: string;
    allServices: string;
    bookAppointment: string;
    privacyPolicy: string;
    servingArea: string;
    hours: string;
    hoursWeekdays: string;
    hoursWeekends: string;
    followUs: string;
    copyright: string;
    certified: string;
  };
  mobileCta: {
    call: string;
    text: string;
    book: string;
  };
  travelCalculator: {
    title: string;
    subtitle: string;
    button: string;
    buttonLoading: string;
    tryAgain: string;
    errors: {
      notSupported: string;
      failed: string;
      permissionDenied: string;
      unavailable: string;
      timeout: string;
      unknown: string;
    };
    location: {
      milesAway: string;
      minutesDrive: string;
      realTime: string;
      estimated: string;
    };
    feeEstimate: string;
    perSignature: string;
    breakdown: {
      title: string;
      baseRate: string;
      perMile: string;
      calculation: string;
      minimum: string;
      maximum: string;
      range: string;
    };
    included: {
      title: string;
      comeToYou: string;
      noParking: string;
      sameDay: string;
      evenings: string;
    };
    callToBook: string;
    calculateAgain: string;
    privacyNote: string;
  };
  common: {
    readMore: string;
    learnMore: string;
    getStarted: string;
    contactUs: string;
    callNow: string;
    bookOnline: string;
    viewServices: string;
    viewServiceAreas: string;
  };
}

// Import dictionaries
const dictionaries = {
  en: () => import('./dictionaries/en/common.json').then((module) => module.default),
  es: () => import('./dictionaries/es/common.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
