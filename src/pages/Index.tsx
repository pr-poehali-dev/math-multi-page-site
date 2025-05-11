
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureCard from "@/components/home/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Что вы найдете на нашем сайте</h2>
              <p className="mt-4 text-lg text-gray-600">Все необходимое для эффективного изучения высшей математики</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard 
                title="Подробная теория" 
                description="Полные и понятные объяснения математических концепций с примерами и иллюстрациями."
                icon="BookOpen"
              />
              <FeatureCard 
                title="Графический калькулятор" 
                description="Визуализируйте функции и исследуйте их поведение на интерактивных графиках."
                icon="LineChart"
              />
              <FeatureCard 
                title="Матричный калькулятор" 
                description="Выполняйте операции с матрицами: сложение, умножение, нахождение определителя и обратной матрицы."
                icon="Table"
              />
              <FeatureCard 
                title="Задачи с решениями" 
                description="Практические задания разной сложности с подробными пошаговыми решениями."
                icon="BookCheck"
              />
              <FeatureCard 
                title="Формулы и шпаргалки" 
                description="Справочные материалы с основными формулами для быстрого доступа к нужной информации."
                icon="FileText"
              />
              <FeatureCard 
                title="Личный кабинет" 
                description="Сохраняйте прогресс обучения, отмечайте избранные материалы и отслеживайте свои достижения."
                icon="User"
              />
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/theory">
                <Button size="lg">Перейти к обучению</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Topics Preview Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Темы для изучения</h2>
              <p className="mt-4 text-lg text-gray-600">От базовых концепций до продвинутых техник</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {["Линейная алгебра", "Математический анализ", "Дифференциальные уравнения", "Теория вероятностей", 
                "Аналитическая геометрия", "Комплексный анализ", "Функциональный анализ", "Дискретная математика"].map((topic, index) => (
                <Link key={index} to={`/theory/${topic.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="p-6 border rounded-lg transition hover:bg-primary/5 hover:border-primary">
                    <h3 className="font-medium text-lg">{topic}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-primary">
          <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Готовы начать изучение?</h2>
            <p className="mt-4 text-lg text-white/80">Присоединяйтесь к сообществу увлеченных математикой студентов</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="h-12 px-8">
                  Зарегистрироваться бесплатно
                </Button>
              </Link>
              <Link to="/theory">
                <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent text-white border-white hover:bg-white/10">
                  Изучить теорию
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
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

export default Index;
