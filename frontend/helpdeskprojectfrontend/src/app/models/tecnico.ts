export interface Tecnico {
    id?: any;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: any[]; // Usamos any[] para aceitar números (0, 1, 2) ou strings
    dataCriacao: any;
}