import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Calendar, Globe, Award, BookOpen } from "lucide-react";
import authorPhoto from "../assets/larisa-author-photo.jpeg";

export default function About() {
  const achievements = [
    {
      title: "Журналистская деятельность",
      description: "Многолетний опыт работы в российских и греческих изданиях",
      icon: BookOpen,
    },
    {
      title: "Международный опыт",
      description: "Более 12 лет жизни и работы в Греции",
      icon: Globe,
    },
    {
      title: "Культурный мост",
      description: "Освещение вопросов эмиграции и межкультурного диалога",  
      icon: Award,
    },
  ];

  const expertise = [
    "Журналистика",
    "Семейные ценности", 
    "Эмиграция",
    "Греческая культура",
    "Осетинская культура",
    "Межкультурный диалог",
    "Автобиографическая проза"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <img 
          src={authorPhoto} 
          alt="Лариса Засеева" 
          className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg"
        />
        <h1 className="text-4xl font-bold text-primary mb-4">Лариса Засеева</h1>
        <p className="text-xl text-secondary">Журналист, писатель, автор</p>
      </div>

      <div className="grid gap-8">
        {/* Bio Section */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">О себе</h2>
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4">
              <p>
                Журналист с многолетним стажем, прошедшая путь от районной газеты в Алагире 
                до международных изданий в Греции. Моя жизнь — это история поиска себя, 
                смены профессий и стремления к новым горизонтам.
              </p>
              <p>
                В 90-х годах, когда страна переживала сложные времена, я приняла решение, 
                которое кардинально изменило мою судьбу — уехала в Грецию. Более 12 лет 
                жизни в эмиграции дали мне уникальный опыт межкультурного взаимодействия 
                и глубокое понимание вопросов адаптации в чужой стране.
              </p>
              <p>
                Сегодня я пишу о том, что близко каждому человеку: о семье и семейных ценностях, 
                о поиске своего места в мире, о любви к родине и принятии новой культуры. 
                Мои статьи — это не просто тексты, это живые истории, пропущенные через сердце.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Контактная информация</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-secondary">Греция</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:larakanzas@yahoo.com" className="text-secondary hover:text-primary">
                  larakanzas@yahoo.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-accent" />
                <span className="text-secondary">Доступна для сотрудничества</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-secondary">Русский, Осетинский, Греческий</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Профессиональный опыт</h2>
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <achievement.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{achievement.title}</h3>
                    <p className="text-secondary">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expertise */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Тематика работ</h2>
            <div className="flex flex-wrap gap-2">
              {expertise.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Philosophy */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Творческое кредо</h2>
            <blockquote className="border-l-4 border-accent pl-6 italic text-lg text-secondary">
              <p>
                "Я пишу не для того, чтобы учить, а для того, чтобы делиться. 
                Каждая история — это мостик между сердцами, каждое слово — возможность 
                понять друг друга немного лучше. В мире, где так много разделяет людей, 
                важно находить то, что нас объединяет."
              </p>
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
