
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileDown,
  Filter,
  Calendar as CalendarIcon,
  Plus,
  Minus
} from 'lucide-react';

// Types
type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
}

// Helper function to generate sample data
const generateSampleData = () => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  return [
    {
      id: '1',
      description: 'Salário',
      amount: 3500,
      type: 'income' as TransactionType,
      category: 'Trabalho',
      date: new Date(),
    },
    {
      id: '2',
      description: 'Aluguel',
      amount: 1200,
      type: 'expense' as TransactionType,
      category: 'Moradia',
      date: new Date(),
    },
    {
      id: '3',
      description: 'Mercado',
      amount: 450,
      type: 'expense' as TransactionType,
      category: 'Alimentação',
      date: new Date(),
    },
    {
      id: '4',
      description: 'Freelance',
      amount: 800,
      type: 'income' as TransactionType,
      category: 'Trabalho',
      date: lastMonth,
    },
    {
      id: '5',
      description: 'Luz',
      amount: 150,
      type: 'expense' as TransactionType,
      category: 'Utilidades',
      date: lastMonth,
    },
  ];
};

// Categories
const incomeCategories = ['Trabalho', 'Investimentos', 'Presente', 'Outros'];
const expenseCategories = ['Alimentação', 'Transporte', 'Moradia', 'Educação', 'Lazer', 'Saúde', 'Utilidades', 'Outros'];

// Main component
const Statistics = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleData());
  const [activeTab, setActiveTab] = useState<'transactions' | 'add' | 'reports'>('transactions');
  
  // Form states
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Filter states
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>(undefined);
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Filtered transactions
  const filteredTransactions = transactions.filter(transaction => {
    const categoryMatch = filterCategory ? transaction.category === filterCategory : true;
    const dateMatch = (filterStartDate && filterEndDate) ? 
      (transaction.date >= filterStartDate && transaction.date <= filterEndDate) : 
      true;
    
    return categoryMatch && dateMatch;
  });

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // Monthly data for chart
  const getMonthlyData = () => {
    const monthlyData: Record<string, { income: number, expense: number }> = {};
    
    transactions.forEach(transaction => {
      const monthYear = format(transaction.date, 'MMM yyyy', { locale: ptBR });
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthYear].income += transaction.amount;
      } else {
        monthlyData[monthYear].expense += transaction.amount;
      }
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category || !date) {
      toast({
        title: "Campo obrigatório",
        description: "Preencha todos os campos para continuar",
        variant: "destructive",
      });
      return;
    }
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: date,
    };
    
    setTransactions([...transactions, newTransaction]);
    
    // Reset form
    setDescription('');
    setAmount('');
    setType('income');
    setCategory('');
    setDate(new Date());
    
    toast({
      title: "Transação adicionada",
      description: `${type === 'income' ? 'Receita' : 'Despesa'} registrada com sucesso.`,
    });
    
    // Switch to transactions tab
    setActiveTab('transactions');
  };

  // Export to CSV
  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Descrição', 'Valor', 'Tipo', 'Categoria', 'Data'];
    const rows = filteredTransactions.map(t => [
      t.description,
      t.amount.toString(),
      t.type === 'income' ? 'Receita' : 'Despesa',
      t.category,
      format(t.date, 'dd/MM/yyyy')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `financas_${format(new Date(), 'dd-MM-yyyy')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportação concluída",
      description: "Seus dados foram exportados com sucesso.",
    });
  };

  return (
    <section id="statistics" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Gerenciamento de Finanças</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">R$ {totalIncome.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">R$ {totalExpense.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                R$ {balance.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'transactions' | 'add' | 'reports')}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="add">Adicionar</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                {showFilters ? 'Ocultar Filtros' : 'Filtrar'}
              </Button>
              
              <Button onClick={exportToCSV} className="flex items-center gap-2">
                <FileDown size={16} />
                Exportar CSV
              </Button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Filtros</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="filter-category">Categoria</Label>
                    <Select
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger id="filter-category">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas</SelectItem>
                        {[...incomeCategories, ...expenseCategories].map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Data inicial</Label>
                    <Calendar
                      mode="single"
                      selected={filterStartDate}
                      onSelect={setFilterStartDate}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Data final</Label>
                    <Calendar
                      mode="single"
                      selected={filterEndDate}
                      onSelect={setFilterEndDate}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Transactions Table */}
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.description}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>{format(transaction.date, 'dd/MM/yyyy')}</TableCell>
                            <TableCell 
                              className={`text-right font-semibold ${
                                transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
                              }`}
                            >
                              {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                            Nenhuma transação encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Add Transaction Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Transação</CardTitle>
                <CardDescription>Registre receitas e despesas do seu orçamento</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ex: Salário, Aluguel..."
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="type">Tipo</Label>
                      <div className="flex space-x-4">
                        <Button
                          type="button"
                          variant={type === 'income' ? 'default' : 'outline'}
                          onClick={() => setType('income')}
                          className="flex-1"
                        >
                          <Plus size={16} className="mr-2" />
                          Receita
                        </Button>
                        <Button
                          type="button"
                          variant={type === 'expense' ? 'default' : 'outline'}
                          onClick={() => setType('expense')}
                          className="flex-1"
                        >
                          <Minus size={16} className="mr-2" />
                          Despesa
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select 
                        value={category} 
                        onValueChange={setCategory}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Data da transação</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border rounded-md"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Salvar Transação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatório Mensal</CardTitle>
                <CardDescription>Visualize suas finanças ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ChartContainer 
                  config={{
                    income: { color: "#22c55e" },
                    expense: { color: "#ef4444" },
                    balance: { color: "#3b82f6" }
                  }}
                  className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[2/1] h-[350px] w-full mt-4"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getMonthlyData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" name="Receitas" fill="var(--color-income)" />
                      <Bar dataKey="expense" name="Despesas" fill="var(--color-expense)" />
                      <Bar dataKey="balance" name="Saldo" fill="var(--color-balance)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Statistics;
