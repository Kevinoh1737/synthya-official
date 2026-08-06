import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";

type DemoRequestData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  task: string;
};

const EMAILJS_SERVICE_ID = "service_lv3mftg";
const EMAILJS_TEMPLATE_ID = "template_isnyh0w";
const EMAILJS_PUBLIC_KEY = "2x2ACVrADaiqiDYSN";

export function DemoRequestModal() {
  const isEnglish = window.location.pathname.startsWith("/en");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestData>();

  useEffect(() => {
    const openFromTrigger = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-demo-request]");
      if (!target) return;
      event.preventDefault();
      setSubmitted(false);
      setSubmitError(false);
      setOpen(true);
    };

    document.addEventListener("click", openFromTrigger);
    return () => document.removeEventListener("click", openFromTrigger);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const onSubmit = async (data: DemoRequestData) => {
    setSubmitError(false);
    try {
      const emailRequest = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          message: data.task,
        },
        EMAILJS_PUBLIC_KEY,
      );

      const archiveRequest = fetch("/api/poc-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const [emailResult] = await Promise.allSettled([emailRequest, archiveRequest]);
      if (emailResult.status === "rejected") throw emailResult.reason;

      reset();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  if (!open) return null;

  return (
    <div
      className="demo-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="demo-modal-panel">
        <button
          ref={closeButtonRef}
          type="button"
          className="demo-modal-close"
          onClick={() => setOpen(false)}
          aria-label={isEnglish ? "Close demo request" : "데모 요청 닫기"}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="demo-modal-intro">
          <p className="demo-modal-kicker">SYNTHYA · VIBECAD</p>
          <h2 id="demo-modal-title">
            {isEnglish ? "Start with one recurring drawing." : "반복되는 도면 한 장에서 시작."}
          </h2>
          <p>
            {isEnglish
              ? "Tell us where repetitive engineering work slows your team down. We’ll review the workflow and contact you directly."
              : "반복되는 설계 업무와 현재 작업 방식을 알려주세요. 자동화 가능성을 검토한 뒤 직접 연락드리겠습니다."}
          </p>
          <div className="demo-modal-points">
            <span><Check className="h-4 w-4" /> {isEnglish ? "Workflow review" : "현재 업무 흐름 검토"}</span>
            <span><Check className="h-4 w-4" /> {isEnglish ? "Engineering-fit assessment" : "설계 자동화 적합성 확인"}</span>
            <span><Check className="h-4 w-4" /> {isEnglish ? "Direct follow-up" : "담당자 직접 회신"}</span>
          </div>
        </div>

        {submitted ? (
          <div className="demo-modal-success" role="status">
            <span><Check className="h-6 w-6" /></span>
            <h3>{isEnglish ? "Request received." : "데모 요청이 접수되었습니다."}</h3>
            <p>{isEnglish ? "Our team will review your request and contact you shortly." : "담당자가 내용을 검토한 뒤 빠르게 연락드리겠습니다."}</p>
            <button type="button" className="button-primary" onClick={() => setOpen(false)}>
              {isEnglish ? "Close" : "확인"}
            </button>
          </div>
        ) : (
          <form className="demo-modal-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="demo-form-grid">
              <label>
                <span>{isEnglish ? "Company" : "회사명"}</span>
                <input {...register("company", { required: true })} aria-invalid={Boolean(errors.company)} />
                {errors.company && <small>{isEnglish ? "Enter your company." : "회사명을 입력해주세요."}</small>}
              </label>
              <label>
                <span>{isEnglish ? "Name" : "담당자 이름"}</span>
                <input {...register("name", { required: true })} aria-invalid={Boolean(errors.name)} />
                {errors.name && <small>{isEnglish ? "Enter your name." : "이름을 입력해주세요."}</small>}
              </label>
              <label>
                <span>{isEnglish ? "Work email" : "업무 이메일"}</span>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small>{isEnglish ? "Enter a valid email." : "올바른 이메일을 입력해주세요."}</small>}
              </label>
              <label>
                <span>{isEnglish ? "Phone" : "연락처"}</span>
                <input type="tel" {...register("phone", { required: true })} aria-invalid={Boolean(errors.phone)} />
                {errors.phone && <small>{isEnglish ? "Enter a phone number." : "연락처를 입력해주세요."}</small>}
              </label>
            </div>
            <label>
              <span>{isEnglish ? "What would you like to automate?" : "자동화하고 싶은 설계 업무"}</span>
              <textarea
                rows={4}
                placeholder={isEnglish ? "Describe the drawing, calculation, or drafting workflow." : "도면, 계산 또는 작도 업무를 간단히 설명해주세요."}
                {...register("task", { required: true })}
                aria-invalid={Boolean(errors.task)}
              />
              {errors.task && <small>{isEnglish ? "Tell us about the workflow." : "검토할 업무를 입력해주세요."}</small>}
            </label>
            {submitError && (
              <p className="demo-form-error" role="alert">
                {isEnglish ? "The request could not be sent. Please try again or email business@synthya.ai." : "요청을 전송하지 못했습니다. 다시 시도하거나 business@synthya.ai로 문의해주세요."}
              </p>
            )}
            <button type="submit" className="button-primary demo-submit-button" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEnglish ? (isSubmitting ? "Sending" : "Submit request") : (isSubmitting ? "전송 중" : "데모 요청 제출")}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="demo-form-privacy">
              {isEnglish ? "Your information is used only to respond to this request." : "입력한 정보는 문의 응답을 위해서만 사용됩니다."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
