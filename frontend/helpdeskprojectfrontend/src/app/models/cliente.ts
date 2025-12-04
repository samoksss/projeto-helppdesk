export interface Cliente {
    id?: any;
    nome: string;
    cpf: string;
    email: string;
    // senha removida
    perfis: string[] | number[];
    dataCriacao?: any;
}