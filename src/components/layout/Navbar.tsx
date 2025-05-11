
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MathConstants, Home, BookOpen, Calculator, BookCheck, LogIn } from 'lucide-react';
import Icon from '@/components/ui/icon';

const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <Icon name="BookOpen" className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">МатМастер</span>
        </Link>
        <div className="hidden md:flex ml-auto gap-4 items-center">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <Icon name="Home" size={18} />
              Главная
            </Button>
          </Link>
          <Link to="/theory">
            <Button variant="ghost" className="gap-2">
              <Icon name="BookOpen" size={18} />
              Теория
            </Button>
          </Link>
          <Link to="/calculators">
            <Button variant="ghost" className="gap-2">
              <Icon name="Calculator" size={18} />
              Калькуляторы
            </Button>
          </Link>
          <Link to="/tasks">
            <Button variant="ghost" className="gap-2">
              <Icon name="BookCheck" size={18} />
              Задачи
            </Button>
          </Link>
        </div>
        <div className="flex ml-auto md:ml-4 items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="LogIn" size={16} />
              <span className="hidden sm:inline-block">Войти</span>
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gap-2">
              Регистрация
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden ml-2">
            <Icon name="Menu" className="h-6 w-6" />
            <span className="sr-only">Меню</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
