import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Class 12th Commerce',
    avatar: 'R',
    avatarClass: 'avatar-1',
    text: 'Abhishi Commerce Classes has completely changed the way I understand Accountancy. The teachers are very supportive and my board exam preparation is going perfectly!',
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'B.Com 2nd Year',
    avatar: 'P',
    avatarClass: 'avatar-2',
    text: 'The video lectures and notes provided are top-notch. I used to struggle with Economics, but now all my concepts are crystal clear. Highly recommended for commerce students!',
  },
  {
    id: 3,
    name: 'Aman Verma',
    location: 'CA Foundation',
    avatar: 'A',
    avatarClass: 'avatar-1',
    text: 'The test series and mock exams are exactly what I needed to boost my confidence. Best commerce coaching I have joined!',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    location: 'Class 11th Commerce',
    avatar: 'N',
    avatarClass: 'avatar-2',
    text: 'Starting 11th commerce was intimidating, but Abhishi Classes made everything so easy to grasp. I love the friendly teaching style.',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-title-area">
            <h2>Students Review</h2>
            <div className="overall-reviews">
              <div className="overall-avatars">
                <div className="r-avatar bg-1">S</div>
                <div className="r-avatar bg-2">R</div>
                <div className="r-avatar bg-3">P</div>
                <div className="r-avatar bg-4">A</div>
                <div className="r-avatar bg-5">K</div>
              </div>
              <div className="overall-rating-text">
                <div className="stars">
                  <Star fill="#FCD34D" color="#FCD34D" size={18} />
                  <Star fill="#FCD34D" color="#FCD34D" size={18} />
                  <Star fill="#FCD34D" color="#FCD34D" size={18} />
                  <Star fill="#FCD34D" color="#FCD34D" size={18} />
                  <Star fill="#FCD34D" color="#FCD34D" size={18} />
                  <span className="rating-score">4.9</span>
                </div>
                <p>from 1500+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-quote"><Quote size={40} fill="#F59E0B" color="#F59E0B" /></div>
              <div className="testimonial-author">
                <div className={`testimonial-avatar ${testimonial.avatarClass}`}>
                  {testimonial.avatar}
                </div>
                <div className="testimonial-author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.location}</p>
                </div>
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
