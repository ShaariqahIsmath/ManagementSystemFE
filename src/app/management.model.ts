export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  emergencyContact: string;
  address: string;
  department: {
    id: number;
    name: string;
    inCharge: string;
  };
  course: {
    id: number;
    name: string;
    type: string; // This could be an enum or string based on your setup
  };
  registration: {
    id: string;
    registrationDate: string;
    registrationMethod: string;
    registrationSource: string;
  };
  module: Module[];
}

export interface Registration {
  id?: null;
  registrationDate: string;
  registrationMethod: string;
  registrationSource: string;
  studentId: number;
  course: Course;
  department: Department;
  modules: Module[];

}

export interface Department {
  id: number;
  name: string;
  inCharge: string;
}

export interface Course {
  id: number;
  name: string;
  type: string;
}

export interface Module {
  code: string;
  name: string;
  duration: string;
  assessments: Assessment[];
}

export interface Assessment {
  id: number;
  moduleCode: string;
  name: string;
  assessmentDetailsList: AssessmentDetail[];
}

export interface AssessmentDetail {
  id: number;
  studentId: { id: number } | null;
  assessmentId: {id: number } | null;
  registrationId: { id: string } | null;
  moduleCode: { code: string } | null;
  name: string | null;
  marks: number;
}

export interface EditAssessmentModalInitialState {
  studentId: number;
  assessmentId: number;
}

export enum AssessmentName {
  IN_CLASS_TEST = "In-class Test",
  COURSEWORK = "Coursework",
  OPEN_BOOK_TEST = "Open Book Test",
  PERFORMANCE_BASED_TEST = "Performance-based Test"
}


export enum DepartmentName {
  COMPUTER_SCIENCE = 'Computer Science',
  BUSINESS = 'Business',
  DATA_SCIENCE = 'Data Science'
}

export enum CourseType {
  FOUNDATION = 'Foundation',
  POSTGRADUATE_STUDIES = 'Postgraduate Studies',
  UNDERGRADUATE_STUDIES = 'Undergraduate Studies',
}
