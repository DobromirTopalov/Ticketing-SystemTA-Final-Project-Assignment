import { Specification } from './specification';

export interface Phone {
    brand: string;

    user: string;

    model: string;

    description: string;

    imgUrl: string;

    price: number;

    specs: Specification;
}
