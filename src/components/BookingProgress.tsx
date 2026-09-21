import React from 'react';
import { Check, Calendar, Plane, User, FileText, CreditCard, CheckCircle2 } from 'lucide-react';
import { BookingStep } from '../types.ts';

interface BookingProgressProps {
  currentStep: BookingStep;
  onStepClick: (step: BookingStep) => void;
  canNavigateTo: (step: BookingStep) => boolean;
}

const STEPS: { id: BookingStep; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'schedule', label: '1. Flight Schedule', icon: Calendar },
  { id: 'results', label: '2. Select Flight', icon: Plane },
  { id: 'passengers', label: '3. Passenger Details', icon: User },
  { id: 'review', label: '4. Review Booking', icon: FileText },
  { id: 'payment', label: '5. Payment', icon: CreditCard },
  { id: 'confirmation', label: '6. Confirmation', icon: CheckCircle2 },
];

export const BookingProgress: React.FC<BookingProgressProps> = ({
  currentStep,
  onStepClick,
  canNavigateTo,
}) => {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav
      aria-label="Flight booking progression steps"
      className="bg-white border-b border-[#e6e9eb] py-3 px-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 sm:gap-4 min-w-max mx-auto">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentIdx;
            const isCurrent = step.id === currentStep;
            const isClickable = canNavigateTo(step.id);
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div
                    className={`h-[2px] w-4 sm:w-8 transition-colors ${
                      idx <= currentIdx ? 'bg-[#0062e3]' : 'bg-[#e6e9eb]'
                    }`}
                  />
                )}

                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#e3f0ff] text-[#0062e3] shadow-xs ring-1 ring-[#0062e3]/40'
                      : isCompleted
                      ? 'text-[#161616] hover:bg-[#f2f4f5] cursor-pointer'
                      : 'text-[#9298a0] cursor-not-allowed opacity-60'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                      isCurrent
                        ? 'bg-[#0062e3] text-white'
                        : isCompleted
                        ? 'bg-[#0fa1a9] text-white'
                        : 'bg-[#e6e9eb] text-[#6e747e]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                  </span>

                  <span className="hidden md:inline font-semibold">{step.label.replace(/^\d+\.\s*/, '')}</span>
                  <span className="md:hidden">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
