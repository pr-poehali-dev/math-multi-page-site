
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Calculators = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Математические калькуляторы</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Воспользуйтесь нашими интерактивными калькуляторами для решения различных математических задач
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Графический калькулятор</CardTitle>
              <CardDescription>
                Построение и анализ графиков функций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="LineChart" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Визуализируйте функции, исследуйте их свойства, находите точки пересечения, максимумы и минимумы.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/graph" className="w-full">
                <Button className="w-full">Открыть калькулятор</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Матричный калькулятор</CardTitle>
              <CardDescription>
                Операции с матрицами любых размеров
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="Table" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Выполняйте сложение, умножение, транспонирование матриц, вычисляйте определители и находите обратные матрицы.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/matrix" className="w-full">
                <Button className="w-full">Открыть калькулятор</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Интегральный калькулятор</CardTitle>
              <CardDescription>
                Вычисление определенных и неопределенных интегралов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="Sigma" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Находите первообразные функций и вычисляйте площади под кривыми с подробными пошаговыми решениями.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/integral" className="w-full">
                <Button variant="outline" className="w-full">
                  Скоро...
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Калькулятор производных</CardTitle>
              <CardDescription>
                Вычисление производных функций
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="Activity" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Находите производные функций любой сложности с пошаговыми объяснениями применяемых правил дифференцирования.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/derivative" className="w-full">
                <Button variant="outline" className="w-full">
                  Скоро...
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Калькулятор СЛАУ</CardTitle>
              <CardDescription>
                Решение систем линейных алгебраических уравнений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="AlignJustify" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Решайте системы линейных уравнений методом Гаусса, Крамера или матричным методом. Подробный вывод решения с промежуточными шагами.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/slae" className="w-full">
                <Button variant="outline" className="w-full">
                  Скоро...
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Комплексные числа</CardTitle>
              <CardDescription>
                Операции с комплексными числами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                <Icon name="CircleDot" className="h-16 w-16 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                Выполняйте арифметические операции с комплексными числами, переводите из алгебраической в тригонометрическую форму и обратно.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/calculators/complex" className="w-full">
                <Button variant="outline" className="w-full">
                  Скоро...
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">МатМастер</h3>
              <p className="text-gray-400">Ваш проводник в мире высшей математики</p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-gray-400 hover:text-white">О нас</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Контакты</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Условия использования</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} МатМастер. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calculators;
