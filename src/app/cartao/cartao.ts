import { Usuario } from "../usuario/usuario";

export class Cartao{
    numero!: number;
    nome!: string;
    status!: boolean;
    tipo!: string;
    usuario!: Usuario;
}