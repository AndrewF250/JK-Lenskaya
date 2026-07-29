import ContentPage from '@/components/layout/ContentPage';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'Ход строительства — ЖК «Ленская»',
  description: 'Следите за ходом строительства жилого комплекса «Ленская» в Перми.',
});

const progressData = [
  {
    building: 'Корпус 1',
    status: 'Отделка фасада',
    progress: 75,
    description: 'Завершено возведение стен, монтаж окон, ведутся работы по отделке фасада и внутренним инженерным сетям.',
  },
  {
    building: 'Корпус 2',
    status: 'Возведение стен',
    progress: 45,
    description: 'Завершено возведение фундамента и межэтажных перекрытий, ведутся работы по возведению стен.',
  },
  {
    building: 'Корпус 3',
    status: 'Фундамент',
    progress: 20,
    description: 'Завершаются работы по устройству фундамента, начинается возведение подземной парковки.',
  },
  {
    building: 'Корпус 4',
    status: 'Подготовка',
    progress: 5,
    description: 'Подготовительные работы, планирование и согласование документации.',
  },
  {
    building: 'Корпус 5',
    status: 'Проектирование',
    progress: 0,
    description: 'Проект находится на стадии проектирования и согласования.',
  },
];

export default function ProgressPage() {
  return (
    <ContentPage
      title="Ход строительства"
      description="Следите за progressом строительства в режиме реального времени"
    >
      <div className="space-y-8">
        {progressData.map((item, index) => (
          <div key={index} className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-display font-semibold">{item.building}</h3>
                <p className="text-primary-600">{item.status}</p>
              </div>
              <div className="text-3xl font-bold text-accent-600">{item.progress}%</div>
            </div>
            <div className="w-full bg-primary-100 rounded-full h-4 mb-4">
              <div
                className="bg-accent-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="text-primary-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-display font-semibold mb-4">Хотите узнать больше?</h2>
        <p className="text-primary-600 mb-6">
          Подпишитесь на обновления и получайте новости о ходе строительства на почту
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Ваш email"
            className="input-field flex-1"
          />
          <button className="btn-primary">Подписаться</button>
        </div>
      </div>
    </ContentPage>
  );
}
