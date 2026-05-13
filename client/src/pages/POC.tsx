import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, MessageSquare, Receipt, BarChart3, Table, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import emailjs from "@emailjs/browser";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

type FormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  task: string;
};

const EMAILJS_SERVICE_ID = "service_lv3mftg";
const EMAILJS_TEMPLATE_ID = "template_isnyh0w";
const EMAILJS_PUBLIC_KEY = "2x2ACVrADaiqiDYSN";

export default function POC() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const dbPromise = fetch("/api/poc-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const emailPromise = emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          message: data.task,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      const [dbResponse] = await Promise.all([dbPromise, emailPromise]);
      
      if (!dbResponse.ok) {
        throw new Error("Failed to submit inquiry");
      }
      
      return dbResponse.json();
    },
    onSuccess: () => {
      toast({
        title: "신청이 완료되었습니다.",
        description: "담당자가 24시간 이내에 연락드리겠습니다.",
      });
      reset();
    },
    onError: () => {
      toast({
        title: "오류가 발생했습니다.",
        description: "다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const taskCards = [
    { icon: FileText, title: "견적서 자동 작성" },
    { icon: MessageSquare, title: "CS 답변 자동화" },
    { icon: Receipt, title: "발주/정산 정리" },
    { icon: BarChart3, title: "리포트/보고서 생성" },
    { icon: Table, title: "반복 엑셀 입력 업무" },
    { icon: Mail, title: "이메일 분류/정리" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <Section className="pt-32 pb-20 text-center gradient-hero relative overflow-hidden hero-shadow-bottom z-10" divider={false}>
          <div className="absolute inset-0 bg-dots opacity-40" />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary leading-tight">
              2주면 충분합니다<br/>
              직접 써보고 결정하세요
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              설명, 제안서, 긴 계약서 없습니다.<br/>
              딱 2주. 무료로 테스트해보고 효과 있으면 그때 이야기하세요.
            </p>
          </motion.div>
        </Section>

        {/* 걱정 제거 섹션 */}
        <Section className="bg-white relative z-20 section-after-hero">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">혹시 이런 걱정 있으신가요?</h2>
            <div className="space-y-4 mb-10">
              <div className="bg-white p-4 rounded-lg border border-border/50 shadow-sm text-muted-foreground italic text-center">
                "상담 받으면 계약해야 하는 거 아닌가..."
              </div>
              <div className="bg-white p-4 rounded-lg border border-border/50 shadow-sm text-muted-foreground italic text-center">
                "괜히 시간만 뺏기는 거 아닌가..."
              </div>
              <div className="bg-white p-4 rounded-lg border border-border/50 shadow-sm text-muted-foreground italic text-center">
                "또 복잡한 준비 필요한 거 아닌가..."
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400" />
              <h3 className="font-bold mb-6 text-xl text-primary">걱정 안 하셔도 됩니다</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-8 w-8 text-green-500" />
                  <span className="font-medium">비용 0원</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-8 w-8 text-green-500" />
                  <span className="font-medium">계약 의무 없음</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-8 w-8 text-green-500" />
                  <span className="font-medium text-center">기술 정의<br/>불필요</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Check className="h-8 w-8 text-green-500" />
                  <span className="font-medium">업무 설명만 하면 끝</span>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground">진짜 가볍게 시작합니다</p>
            </div>
          </div>
        </Section>

        {/* POC 진행 방식 */}
        <Section className="bg-secondary/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">이렇게 진행됩니다</h2>
            
            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-muted to-muted" />
              <div className="text-center relative">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">1</div>
                <h3 className="font-bold mb-2">상담 (30분)</h3>
                <p className="text-sm text-muted-foreground">어떤 업무가 제일 귀찮은지 이야기해주세요</p>
              </div>
              <div className="text-center relative">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white border-2 border-muted flex items-center justify-center text-primary font-bold text-xl shadow-sm">2</div>
                <h3 className="font-bold mb-2">AI 전담 사원 제작</h3>
                <p className="text-sm text-muted-foreground">우리가 알아서 만듭니다<br/>(약 1~2주)</p>
              </div>
              <div className="text-center relative">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white border-2 border-muted flex items-center justify-center text-primary font-bold text-xl shadow-sm">3</div>
                <h3 className="font-bold mb-2">실제 업무 테스트</h3>
                <p className="text-sm text-muted-foreground">직원들이 직접 사용하고 효과 바로 확인</p>
              </div>
              <div className="text-center relative">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white border-2 border-muted flex items-center justify-center text-primary font-bold text-xl shadow-sm">4</div>
                <h3 className="font-bold mb-2">결정</h3>
                <p className="text-sm text-muted-foreground">마음에 들면 계속, 아니면 종료 (비용 0원)</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 추천 업무 */}
        <Section className="bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">이런 업무로 많이 시작합니다</h2>
            <p className="text-center text-muted-foreground mb-12">딱 하나만 골라도 충분합니다. 작을수록, 더 빨리 효과가 납니다.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {taskCards.map((task, i) => (
                <Card key={i} className="border-border/60 hover:border-primary/40 card-hover cursor-pointer group">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
                      <task.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium">{task.title}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* 고객 후기 */}
        <Section className="bg-secondary/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">대표님들이 2주 후 이렇게 말씀하십니다</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
              <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
                <p className="text-lg font-medium text-primary">“처음엔 반신반의했는데, 진짜 2주 만에 돌아가는 거 보고 좀 놀랐습니다.”</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
                <p className="text-lg font-medium text-primary">“직원 한 명 더 뽑은 것보다 낫네요. 월급 주는 직원보다 일을 더 많이 해요.”</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
                <p className="text-lg font-medium text-primary">“야근하던 업무가 없어지니까 직원들 표정부터 달라졌어요.”</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
                <p className="text-lg font-medium text-primary">“솔직히… 이걸 왜 이제 했나 싶습니다.”</p>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground">
              2주 후, 아마 같은 말을 하실 겁니다.
            </p>
          </div>
        </Section>

        {/* POC 신청 폼 */}
        <Section id="poc-form" className="bg-primary/5">
          <div className="max-w-xl mx-auto">
            <Card className="border-primary border-2 shadow-xl shadow-primary/10">
              <CardHeader className="bg-primary text-white rounded-t-lg text-center">
                <CardTitle className="text-2xl">우리 업무에 적용 상담하기</CardTitle>
                <p className="text-white/80 text-sm mt-2">2주 안에 결과 확인 가능합니다</p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">회사명 <span className="text-red-400">*</span></Label>
                    <Input 
                      id="company" 
                      placeholder="주식회사 신티아" 
                      {...register("company", { required: "회사명을 입력해주세요" })} 
                    />
                    {errors.company && <span className="text-xs text-red-500">{errors.company.message}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">담당자 이름 <span className="text-red-400">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="홍길동" 
                      {...register("name", { required: "이름을 입력해주세요" })} 
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일 <span className="text-red-400">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@company.com" 
                      {...register("email", { 
                        required: "이메일을 입력해주세요",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "올바른 이메일 형식이 아닙니다"
                        }
                      })} 
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처 <span className="text-red-400">*</span></Label>
                    <Input 
                      id="phone" 
                      placeholder="010-1234-5678" 
                      {...register("phone", { required: "연락처를 입력해주세요" })} 
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task">자동화하고 싶은 업무 (한 줄 자유 입력) <span className="text-red-400">*</span></Label>
                    <Textarea 
                      id="task" 
                      placeholder="예: 매일 들어오는 주문 메일을 엑셀로 정리하고 싶어요." 
                      className="min-h-[100px]"
                      {...register("task", { required: "자동화하고 싶은 업무를 입력해주세요" })} 
                    />
                    {errors.task && <span className="text-xs text-red-500">{errors.task.message}</span>}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full mt-4 font-bold"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "제출 중..." : "신청 완료하기"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    담당자가 확인 후 24시간 이내에 연락드립니다.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
