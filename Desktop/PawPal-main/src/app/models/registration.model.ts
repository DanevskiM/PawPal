// ================================================
// PawCare MK – Registration Form Models
// ================================================

export interface ClientInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  mobilePhone?: string;
  email: string;
  emergencyContact: string;
  alternativePerson: string;
}

export interface PetInfo {
  name: string;
  breed: string;
  dateOfBirth: string;
  weight: number | null;
  gender: 'Машко' | 'Женско' | '';
  neutered: boolean | null;
  microchipped: boolean | null;
  ownershipDuration: string;
}

export interface HealthInfo {
  vaccinated: boolean | null;
  vaccinationNote?: string;
  vetName: string;
  clinicName: string;
  medicalConditions?: string;
  allergies?: string;
  physicalLimitations?: string;
  fleaTreatment: boolean | null;
  heartwormTreatment: boolean | null;
}

export interface BehaviorInfo {
  previousTraining?: string;
  previousHotelStay: boolean | null;
  trainedToStayAlone: boolean | null;
  reactionToAnimals: string;
  favoriteReward?: string;
  favoriteToys?: string;
  behaviorChallenges: string[];
  additionalNotes?: string;
}

export interface StayAndFeedingInfo {
  checkInDateTime: string;
  checkOutDateTime: string;
  feedingSchedule: string;
  feedingInstructions?: string;
  foodBrand?: string;
  acceptsTreats: boolean | null;
  foodAllergies?: string;
  termsAccepted: boolean;
}

export interface RegistrationForm {
  date: string;
  clientInfo: ClientInfo;
  petInfo: PetInfo;
  healthInfo: HealthInfo;
  behaviorInfo: BehaviorInfo;
  stayInfo: StayAndFeedingInfo;
}

export const BEHAVIOR_CHALLENGES = [
  'Каснување',
  'Лаење кон луѓе',
  'Агресивност со животни',
  'Срамежливост',
  'Скокање на луѓе',
  'Прескокнување огради',
  'Џвакање / копање',
  'Бркање мали животни',
  'Бегање',
  'Претерано влечење на поводник',
] as const;

export const OWNERSHIP_DURATIONS = [
  '< 6 месеци',
  '6–12 месеци',
  '1–3 години',
  '3–5 години',
  '> 5 години',
] as const;

export const FEEDING_SCHEDULES = [
  '1x дневно',
  '2x дневно',
  '3x дневно',
  'По потреба',
] as const;

export const ANIMAL_REACTIONS = [
  'Пријателски',
  'Резервирано / срамежливо',
  'Агресивно кон некои',
  'Агресивно кон сите',
] as const;
