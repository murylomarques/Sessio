// /app/app/calendar/CalendarView.tsx - VERSÃO FINAL LIMPA SEM BORDA PRETA

"use client";

import { useI18n } from "@/lib/useI18n";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useRouter } from "next/navigation";
import { CalendarDaysIcon, UserIcon, ClockIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast';

type CalendarViewProps = {
  initialEvents: any[];
};

export default function CalendarView({ initialEvents }: CalendarViewProps) {
  const { t } = useI18n();
  const router = useRouter();

  const handleEventClick = (clickInfo: any) => {
    const patientId = clickInfo.event.extendedProps.patientId;
    if (patientId) {
      router.push(`/app/patients/${patientId}`);
    } else {
      toast.error(t.calendar.event_click_error);
    }
  };

  const handleDateClick = (arg: any) => {
    toast(t.calendar.date_click_alert, {
      icon: '💡',
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <CalendarDaysIcon className="h-6 w-6 text-[var(--color-primary)]" />
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {t.calendar.title}
          </h1>
          <p className="text-sm text-neutral-500">
            {t.calendar.subtitle}
          </p>
        </div>
      </div>

      {/* CALENDAR CARD */}
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="border-b bg-neutral-50 px-6 py-4 text-sm font-medium text-neutral-700">
          📅 {t.calendar.header}
        </div>

        <div className="p-4 md:p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={ptBrLocale}
            events={initialEvents}
            selectable
            editable
            height="auto"
            dayMaxEventRows={3}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            eventContent={(eventInfo) => {
              const time = eventInfo.event.start?.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  className="flex flex-col gap-1 px-3 py-2 rounded-lg shadow-sm overflow-hidden hover:brightness-105 transition-all cursor-pointer"
                  style={{
                    backgroundColor: eventInfo.backgroundColor || "var(--color-primary)",
                    border: "none", // remove borda preta do FullCalendar
                    color: eventInfo.textColor || "var(--color-bg)",
                  }}
                >
                  <div className="flex items-center gap-1 font-medium text-sm">
                    <UserIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate block max-w-[85%]" title={eventInfo.event.title}>
                      {eventInfo.event.title}
                    </span>
                  </div>
                  {time && (
                    <div className="flex items-center gap-1 opacity-90 text-xs">
                      <ClockIcon className="h-3 w-3 flex-shrink-0" />
                      <span>{time}</span>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* CSS para remover bordas do FullCalendar */}
      <style jsx global>{`
        /* Remove bordas e sombras padrão dos eventos */
        .fc .fc-event, 
        .fc .fc-event:hover, 
        .fc .fc-event:focus {
          border: none !important;
          box-shadow: none !important;
        }
        /* Remove borda do cabeçalho do calendário */
        .fc .fc-col-header, 
        .fc .fc-daygrid-event {
          border: none !important;
        }
      `}</style>
    </div>
  );
}
