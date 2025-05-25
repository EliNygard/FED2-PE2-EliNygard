// API

export interface IRegisterRequest {
  method: string;
  body: {
    name: string;
    email: string;
    password: string;
    avatar: IMedia;
    venueManager?: boolean;
  };
}

export interface IUser {
  name: string;
  email: string;
  avatar: IMedia;
  accessToken: string;
  venueManager: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  avatar: IMedia;
  venueManager?: boolean;
}

export interface IMedia {
  url: string;
  alt: string;
}

export interface IVenue {
  id: string;
  name: string;
  description: string;
  media?: IMedia[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
  owner: IPerson;
  bookings: IBookingOnVenue[];
}

export interface IVenueRequest {
  name: string;
  description: string;
  media?: IMedia[];
  price: number;
  maxGuests: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
}

export interface IPerson {
  name: string;
  email: string;
  avatar: IMedia;
}
export interface IProfile {
  name: string;
  email: string;
  avatar: IMedia;
  venueManager?: boolean;
  _count: {
    venues: number;
    bookings: number;
  };
  bookings: IBooking[];
  venues: IVenue[];
}

export interface IBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: IPerson;
  venue: IVenue;
}

export interface ICreateBooking {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export interface IUpdateProfile {
  avatar: IMedia;
}

export interface IBookingOnVenue {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: IPerson;
}

export interface IPaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

// other

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isVenueManager: boolean;
  isHydrating: boolean;
  isLoading: boolean;
  setLoading: (status: boolean) => void;
  setHydrating: (status: boolean) => void;
  setUser: (user: IUser) => void;
  updateAvatar: (avatar: IMedia) => void;
  logout: () => void;
}
