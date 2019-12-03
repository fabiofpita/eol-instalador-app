import { Contact } from './contact';
import { Location } from './location';

export class User {
    id: number;
    name: string;
    lastName: string;
    birthDate: string;
    gender: string;
    cpf: string;
    type: string;
    username: string;
    confirmPassword: string;
    location: Location;
    contact: Contact;
}