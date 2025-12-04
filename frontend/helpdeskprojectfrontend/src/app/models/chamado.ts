export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;      // Códigos: 0=BAIXA, 1=MÉDIA, 2=ALTA
    status: string;          // Códigos: 0=ABERTO, 1=ANDAMENTO, 2=ENCERRADO
    titulo: string;
    observacoes: string;
    tecnico: any;            // ID do técnico
    cliente: any;            // ID do cliente
    nomeTecnico: string;     // Nome para exibir na lista
    nomeCliente: string;     // Nome para exibir na lista
}