export const defaultCaching = {
  staleTime: 140000,
  cacheTime: 350000,
  retry: 3,
};

export const LongerCaching = {
  staleTime: 1040000,
  cacheTime: 1350000,
  retry: 3,
};

export const AGE = [
  { label: "New Born", value: 1 },
  { label: "Young - Under 6 months", value: 2 },
  { label: "Juvenile 6+ Months", value: 3 },
  { label: "Adult", value: 4 },
  { label: "Old", value: 5 },
];

export const ABC_STATUS = [
  {
    label: "Already operated",
    value: "already_operated",
  },
  {
    label: "Required",
    value: "required",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "NA",
    value: "NA",
  },
];

export const CONDITION = [
  {
    label: "Good",
    value: "good",
  },
  {
    label: "Poor",
    value: "poor",
  },
  {
    label: "Collapsed",
    value: "collapsed",
  },
  {
    label: "Serious",
    value: "serious",
  },
];

export const BODY_SCORE = [
  {
    label: "Emaciated",
    value: "emaciated",
  },
  {
    label: "Very Thin",
    value: "very_thin",
  },
  {
    label: "Thin",
    value: "thin",
  },
  {
    label: "Healthy",
    value: "healthy",
  },
  {
    label: "Fat/Obese",
    value: "fat_obese",
  },
];

export const SICKNESS = [
  {
    label: "Ascites",
    value: "ascites",
  },
  {
    label: "Distemper",
    value: "distemper",
  },
  {
    label: "Hepatitis",
    value: "hepatitis",
  },
  {
    label: "Infection - Ear",
    value: "infection_ear",
  },
  {
    label: "Infection - Eye",
    value: "infection_eye",
  },
  {
    label: "Infection - Skin",
    value: "infection_skin",
  },
  {
    label: "Mange",
    value: "mange",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const PROBLEM = [
  { label: "Sick", value: "sick" },
  { label: "Injured", value: "injured" },
  { label: "Other", value: "other" },
];

export const INJURY = [
  { label: "Burn", value: "burn" },
  { label: "Colic", value: "colic" },
  { label: "Cut", value: "Cut" },
  { label: "Degloving", value: "degloving" },
  { label: "Eye Out", value: "eye_out" },
  { label: "Foreign Body", value: "foreign_body" },
  { label: "Fracture - Closed", value: "fracture_closed" },
  { label: "Fracture - Open", value: "fracture_open" },
  { label: "Horn Disease", value: "horn_disease" },
  { label: "Maggot Wound", value: "maggot_wound" },
  { label: "Muscle Damage", value: "muscle_damage" },
  { label: "Nerve Damage", value: "nerve_damage" },
  { label: "Other", value: "other" },
  { label: "Paralysed", value: "paralysed" },
  { label: "Prolapse - Anal", value: "prolapse_anal" },
  { label: "Puncture Wound", value: "puncture_wound" },
  { label: "Tumour - Cancerous", value: "tumour_cancerous" },
  { label: "Tumour - Non Cancerous", value: "tumour_non_cancerous" },
  { label: "TVT - Trans Venereal Tumour", value: "tvt_trans_venereal_tumour" },
  { label: "Wound - General", value: "wound_general" },
];

export const SICKNESS_SYMPTOMS = [
  { label: "Collapsed", value: "collapsed" },
  { label: "Constipation", value: "constipation" },
  { label: "Coughing", value: "coughing" },
  { label: "Dehydrated", value: "Dehydrated" },
  { label: "Diarrhea", value: "Diarrhea" },
  { label: "Face Swelling", value: "face_swelling" },
  { label: "Fitting", value: "fitting" },
  { label: "Nasal Discharge", value: "nasal_discharge" },
  { label: "Respiratory Distress", value: "respiratory_distress" },
  { label: "Salivating", value: "salivating" },
  { label: "Stomach Pain", value: "stomach_pain" },
  { label: "Temperature - High", value: "temperature_high" },
  { label: "Temperature - Low", value: "temperature_low" },
  { label: "Unconscious", value: "unconscious" },
  { label: "Vomiting", value: "vomiting" },
];

export const INJURY_LOCATION = [
  { label: "All Body", value: "all_body" },
  { label: "Anus", value: "anus" },
  { label: "Chest - Front", value: "chest_front" },
  { label: "Chest - Under", value: "chest_under" },
  { label: "Ear - Left", value: "ear_left" },
  { label: "Ear - Right", value: "ear_right" },
  { label: "Eye - Left", value: "eye_left" },
  { label: "Eye - Right", value: "eye_right" },
  { label: "Face - All", value: "face_all" },
  { label: "Femur", value: "femur" },
  { label: "Foot - FL", value: "foot_fl" },
  { label: "Foot - FR", value: "foot_fr" },
  { label: "Foot - HL", value: "foot_hl" },
  { label: "Foot - HR", value: "foot_hr" },
  { label: "Head - Top", value: "head_top" },
  { label: "Hip - Left", value: "hip_left" },
  { label: "Hoof - FL", value: "hoof_fl" },
  { label: "Hoof - FR", value: "hoof_fr" },
  { label: "Hoof - HL", value: "hoof_hl" },
  { label: "Hoof - HR", value: "hoof_hr" },
  { label: "Horn - Left", value: "horn_left" },
  { label: "Horn - Right", value: "horn_right" },
  { label: "Jaw", value: "jaw" },
  { label: "Leg - FL", value: "leg_fl" },
  { label: "Leg - HL", value: "leg_hl" },
  { label: "Leg - HR", value: "leg_hr" },
  { label: "Mammory", value: "mammory" },
  { label: "Mouth", value: "mouth" },
  { label: "Neck - Side", value: "neck_side" },
  { label: "Neck - Top", value: "neck_top" },
  { label: "Neck - Under", value: "neck_under" },
  { label: "Nose", value: "nose" },
  { label: "Penis", value: "penis" },
  { label: "Shoulder - Left", value: "shoulder_left" },
  { label: "Shoulder - Right", value: "shoulder_right" },
  { label: "Side - Left", value: "side_left" },
  { label: "Side - Right", value: "side_right" },
  { label: "Spine", value: "spine" },
  { label: "Stomach", value: "stomach" },
  { label: "Tail", value: "tail" },
  { label: "Udder", value: "udder" },
  { label: "Vagina", value: "vagina" },
  { label: "Wing", value: "wing" },
];

export const OTHER_ADMISSION = [
  { label: "Abandoned at TOLFA", value: "abandoned_at_tolfa" },
  { label: "Abandoned Owned Animal", value: "abandoned_owned_animal" },
  { label: "Abuse in Area", value: "abuse_in_area" },
  { label: "Aggressive", value: "aggressive" },
  { label: "Everyone Bite Dog", value: "everyone_bite_dog" },
  { label: "Fixed Paralysis", value: "fixed_paralysis" },
  { label: "Old", value: "old" },
  { label: "Under Observation", value: "under_observation" },
];
