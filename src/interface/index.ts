// API 

export interface IRegisterRequest {
  method: string;
  body: {
    name: string;
    email: string;
    password: string;
    bio?: string;
    avatar: IMedia;
    venueManager?: boolean;
  };
}

export interface IUser {
  name: string;
  email: string;
  bio?: string;
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
  bio?: string;
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
  owner: IPerson
  bookings: IBooking[]
}

export interface IPerson {
  name: string;
  email: string;
  bio?: string;
  avatar: IMedia;
}
export interface IProfile {
  name: string;
  email: string;
  bio?: string;
  avatar: IMedia;
  venueManager?: boolean;
  _count: {
    venues: number
    bookings: number
  }
  bookings: IBooking[];
  venues: IVenue[]
}

export interface IBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: IPerson
  venue: IVenue
}

export interface ICreateBooking {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export interface IUpdateProfile {
  avatar: IMedia
}


// other
