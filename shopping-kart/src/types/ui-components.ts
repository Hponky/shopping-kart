export interface AnimationProps {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export interface InteractiveProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

export interface VisualProps {
  variant?: string;
  size?: string;
  className?: string;
}

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ProductShowcaseItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}