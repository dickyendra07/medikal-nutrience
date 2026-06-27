"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mednutAssets } from "@/data/mednut-assets";

const events = [
  {
    title: "Clinical Nutrition Symposium 2026",
    category: "Seminar Nutrisi",
    date: "15 Agustus 2026",
    location: "Jakarta",
    image: mednutAssets.support.bmiCalculator,
    description:
      "Seminar edukasi nutrisi klinis untuk tenaga kesehatan dan masyarakat umum.",
  },
  {
    title: "Edukasi Nutrisi Keluarga",
    category: "Webinar Keluarga",
    date: "22 Agustus 2026",
    location: "Online",
    image: mednutAssets.support.educationHealth,
    description:
      "Sesi edukasi seputar kebutuhan nutrisi keluarga di setiap tahap kehidupan.",
  },
  {
    title: "Mitra Medis & Rumah Sakit",
    category: "Program Mitra",
    date: "29 Agustus 2026",
    location: "Jakarta",
    image: mednutAssets.support.doctorConsultation,
    description:
      "Program pengenalan solusi nutrisi Medikal Nutrience untuk mitra fasilitas kesehatan.",
  },
  {
    title: "Cek Status Gizi",
    category: "Aktivasi Kesehatan",
    date: "5 September 2026",
    location: "Jabodetabek",
    image: mednutAssets.support.bmiCalculator,
    description:
      "Aktivitas skrining awal status gizi dan edukasi kebutuhan nutrisi harian.",
  },
  {
    title: "Dapur Sehat FIMA",
    category: "Kelas Edukasi",
    date: "12 September 2026",
    location: "Online",
    image: mednutAssets.support.educationHealth,
    description:
      "Kelas inspirasi menu sehat dan cara menyusun asupan keluarga yang lebih seimbang.",
  },
  {
    title: "Artikel Edukasi FIMA",
    category: "Edukasi Digital",
    date: "19 September 2026",
    location: "Online",
    image: mednutAssets.banners.brandArtboard1,
    description:
      "Sesi pengenalan materi edukasi digital dan konten kesehatan dari Medikal Nutrience.",
  },
];

const referralOptions = [
  "Instagram",
  "Website",
  "Sales Medical Nutrience",
  "WhatsApp",
  "Teman",
  "Rumah Sakit",
  "Lainnya",
];

type EventItem = (typeof events)[number];

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <>
      <Navbar />

      <main className="bg-[#f4fbf8]">
        <section className="relative overflow-hidden px-5 py-12 md:py-20 lg:px-10">
          <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d9f3e8]" />
          <div className="absolute bottom-[-220px] right-[-120px] h-[460px] w-[460px] rounded-full bg-[#c6f1df]" />

          <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-[#006b3f] px-6 py-12 text-center text-white shadow-2xl shadow-green-900/15 md:px-10 md:py-16">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-white/70">
              Event Medikal Nutrience
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Ikuti Event Seminar Medikal Nutrience
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-7 text-white/80 md:text-base md:leading-8">
              Temukan seminar, workshop, webinar, dan berbagai kegiatan edukasi
              kesehatan yang dapat diikuti oleh tenaga kesehatan maupun
              masyarakat umum.
            </p>
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-[1180px] gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/8 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
              >
                <div className="h-52 overflow-hidden bg-[#e8f8f1]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#006b3f]">
                    {event.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight text-[#111827]">
                    {event.title}
                  </h2>

                  <div className="mt-4 space-y-2 text-sm font-bold text-[#64748b]">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <p className="mt-4 text-sm font-medium leading-7 text-[#64748b]">
                    {event.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(event)}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#006b3f] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                      →
                    </span>
                    Daftar Sekarang
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {selectedEvent ? (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      ) : null}
    </>
  );
}

function EventRegistrationModal({
  event,
  onClose,
}: {
  event: EventItem;
  onClose: () => void;
}) {
  const [agree, setAgree] = useState(false);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-[#0f172a]/55 px-4 py-6 backdrop-blur-md md:items-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Tutup form registrasi event"
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#006b3f]">
              Form Registrasi
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#111827] md:text-4xl">
              {event.title}
            </h2>
            <p className="mt-3 text-sm font-bold text-[#64748b]">
              {event.date} • {event.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4f8ed] text-xl font-black text-[#006b3f] transition hover:bg-[#006b3f] hover:text-white"
          >
            ×
          </button>
        </div>

        <form
          className="mt-7 grid gap-4"
          onSubmit={(eventSubmit) => {
            eventSubmit.preventDefault();
            onClose();
          }}
        >
          <div>
            <label className="text-sm font-black text-[#111827]">
              Nama Lengkap
            </label>
            <input
              required
              placeholder="Tulis nama lengkap"
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold outline-none focus:border-[#006b3f] focus:bg-white"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-black text-[#111827]">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="nama@email.com"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold outline-none focus:border-[#006b3f] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#111827]">
                Nomor WhatsApp
              </label>
              <input
                required
                inputMode="tel"
                placeholder="08xxxxxxxxxx"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold outline-none focus:border-[#006b3f] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-black text-[#111827]">
              Bagaimana Anda mengetahui event ini?
            </label>
            <select
              required
              className="mt-2 w-full rounded-2xl border border-black/10 bg-[#f8fcfa] px-4 py-4 text-sm font-bold outline-none focus:border-[#006b3f] focus:bg-white"
            >
              <option value="">Pilih sumber informasi</option>
              {referralOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <label className="flex gap-3 rounded-2xl bg-[#f8fcfa] p-4 ring-1 ring-black/5">
            <input
              type="checkbox"
              checked={agree}
              onChange={(eventAgree) => setAgree(eventAgree.target.checked)}
              className="mt-1 h-4 w-4 shrink-0"
              required
            />
            <span className="text-sm font-medium leading-6 text-[#64748b]">
              Saya bersedia menerima informasi mengenai event dan edukasi dari
              Medikal Nutrience. Ini berguna untuk komunikasi event berikutnya.
            </span>
          </label>

          <button
            type="submit"
            disabled={!agree}
            className="mt-2 rounded-full bg-[#006b3f] px-7 py-4 text-sm font-black text-white shadow-lg shadow-green-900/15 transition hover:bg-[#005432] disabled:cursor-not-allowed disabled:bg-[#e5e7eb] disabled:text-[#94a3b8]"
          >
            Kirim Registrasi
          </button>
        </form>
      </div>
    </div>
  );
}
