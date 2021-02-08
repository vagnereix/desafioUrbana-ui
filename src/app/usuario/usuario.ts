import { Cartao } from "../cartao/cartao";

export class Usuario{
    id!: number;
    email!: string;
    senha!: string;
    nome!:string;
    cartoes!: Cartao[];
}