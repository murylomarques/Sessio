# Sessio: O EHR Essencial para Terapeutas Solo

## 🧠 Visão do Problema Real (Data-Driven)

O mercado de *Electronic Health Records* (EHR) para saúde mental está saturado de soluções complexas e caras, forçando o terapeuta solo a pagar por funcionalidades que não usa. A dor não é a falta de software, mas sim o **custo cognitivo e financeiro** imposto por ferramentas inchadas.

A seguir, 3 evidências reais que provam que terapeutas estão perdendo dinheiro ou tempo com o *status quo*:

1.  **Custo Financeiro e Aumento de Preços:** A principal reclamação contra líderes de mercado como o SimplePractice é o preço elevado, especialmente após aumentos recentes. Terapeutas solo, que operam com margens menores, sentem-se "roubados" ao pagar $99/mês por um sistema que usam parcialmente. A insatisfação é pública e documentada em fóruns e sites de reclamação, como o Better Business Bureau (BBB) [1] e o Reddit [2].
2.  **Complexidade e Fricção no Fluxo de Trabalho:** A complexidade desnecessária leva a erros e perda de tempo. Usuários do SimplePractice relatam que "os problemas de faturamento são enlouquecedores" e que o fluxo de trabalho é "complicado" e "exige gerenciamento extra" [3]. O terapeuta não quer ser um especialista em faturamento de convênios, ele quer focar na sessão.
3.  **Medo da Migração de Dados:** A barreira mais alta para a mudança é o medo de perder dados de pacientes. A migração de dados de EHR é um desafio conhecido na área da saúde, envolvendo riscos de dados incompletos ou imprecisos [4]. O Sessio transforma essa dor em nossa principal vantagem competitiva, oferecendo um importador de dados do SimplePractice como um "bote salva-vidas" [5].

---

## 🎯 A Proposta de Valor Inegociável

**A ÚNICA dor que o Sessio resolve é a Sobrecarga Cognitiva e Financeira do Terapeuta Solo.**

> **Proposta de Valor:** "O Sessio é o único EHR que permite ao terapeuta solo **focar 100% na sessão**, eliminando o estresse do software complexo e caro. Você paga apenas pelo que é essencial: agendamento, prontuário e recebimento."

O cliente ignora o preço de $29/mês (1/3 do concorrente) porque o Sessio oferece **Fluência Cognitiva**: um sistema tão intuitivo quanto um bloco de notas, mas com a segurança e estrutura de um EHR de nível profissional. O valor percebido é a **paz de espírito** e a **recuperação de tempo** perdido com burocracia.

---

## 🎯 Público-Alvo & Persona (O Foco Inegociável)

O Sessio é construído com uma filosofia de reducionismo radical, o que exige um foco de mercado cirúrgico.

**Público-Alvo Exclusivo:** Terapeutas Solo (Psicólogos, Psicanalistas, Terapeutas Ocupacionais) que atendem no modelo particular (*private pay*) e não possuem secretária.

**Persona Principal: Dr. Ana, a Autônoma**

| Perfil | Dor | Desejo |
| :--- | :--- | :--- |
| 35-50 anos, clínica online/híbrida. | Pânico de perder dados, odeia configurar software, acha $99/mês caro. | "Quero atender meu paciente, escrever minha nota e ir para casa." |
| **Comportamento:** Usa WhatsApp para agendar, Excel para financeiro. Medo de tecnologia complexa. | **O Sessio Vence:** Oferecendo segurança de dados (criptografia) e simplicidade (Fluência Cognitiva). | **O Sessio Entrega:** Foco na sessão e automação de tarefas burocráticas (cobrança e lembretes). |

---

## 🚪 Fluxo de Aquisição (A Porta de Entrada)

A aquisição é a primeira etapa da Arquitetura de Conversão. O objetivo é levar o usuário da dor (concorrente caro/complexo) à ação (iniciar o Trial) com a menor fricção possível.

### 1. Landing Page (LP): A Máquina de Conversão

A LP deve ser focada em uma única mensagem: **"Migre do seu EHR caro e complexo em 5 minutos."**

| Elemento | Conteúdo | Propósito Comportamental |
| :--- | :--- | :--- |
| **Headline Principal** | "Chega de pagar $99 por um software que você não usa. Sessio: O EHR Essencial para Terapeutas Solo." | **Ataque Direto à Dor:** Valida a frustração do usuário e apresenta a solução de forma imediata. |
| **Sub-Headline** | "Agendamento, Prontuário e Recebimento. Nada mais. Tudo por $29/mês." | **Reducionismo Radical:** Reforça a proposta de valor de forma clara e transparente. |
| **CTA Principal** | **"Comece Seu Teste Grátis de 7 Dias e Migre Seus Dados Agora"** | **Gatilho de Urgência + Solução da Dor:** O Trial é atrelado à *feature* mais valiosa (Importador), incentivando a ação imediata. |
| **Seção de Prova** | Depoimentos de terapeutas que migraram do SimplePractice. | **Prova Social:** Reduz o risco percebido da mudança. |

### 2. Tela de Planos (Pricing): Transparência e Contraste

A tela de planos deve ser simples, reforçando o valor do Sessio contra o *status quo*.

| Plano | Preço | Foco | Contraste Comportamental |
| :--- | :--- | :--- | :--- |
| **Plano Solo (Mensal)** | **$29/mês** | Flexibilidade | Preço baixo e previsível. Elimina a ansiedade de custos variáveis. |
| **Plano Solo (Anual)** | **$299/ano** | Economia (2 Meses Grátis) | Bloqueio de Retenção. Oferece um benefício claro para o compromisso de longo prazo. |
| **Plano Fantasma (Concorrente)** | ~$99/mês | **Dor** | Serve como âncora de preço, fazendo o Sessio parecer uma economia inegociável. |

### 3. Login & Registro (Auth): Fricção Zero

O registro é o **Passo 1** da Arquitetura de Conversão (4 cliques). Deve ser o mais rápido possível.

*   **Registro:** Apenas **Email** e **Senha**. O nome completo e outras informações serão coletadas no *onboarding* (após o login), quando o usuário já está engajado.
*   **Login:** Email/Senha ou **Magic Link** (login sem senha). O Magic Link é preferível para reduzir a carga cognitiva de lembrar senhas.
*   **Tecnologia:** Supabase Auth, garantindo segurança e escalabilidade desde o início.

---

## 🏗️ Arquitetura de Conversão (UX/UI)

O objetivo é levar o usuário do `Registro` ao `Primeiro Valor Percebido (Aha! Moment)` em **menos de 4 cliques**.

| Passo | Ação do Usuário | Ação do Sistema | Fricção Cognitiva Reduzida |
| :---: | :--- | :--- | :--- |
| **1** | **Registro** (Email/Senha ou Magic Link) | Cria conta e envia para o Dashboard. | Não há "Tour" ou "Boas-vindas" longos. Ação imediata. |
| **2** | **Aha! Moment:** Clica em "Importar Dados do SimplePractice" | Abre o *wizard* de importação (CSV). | O primeiro valor percebido é a **solução do problema de migração**. O usuário vê que a mudança é fácil. |
| **3** | **Primeiro Uso:** Clica em "Adicionar Paciente" (ou importa) | Abre a tela de cadastro minimalista. | O sistema não exige preenchimento de campos desnecessários (ex: convênio). Foco no nome e contato. |
| **4** | **Primeira Sessão:** Clica no paciente e em "Nova Nota" | Abre o Prontuário com o editor de texto. | O usuário está fazendo o que ele faz de melhor: escrever a nota clínica. O sistema salva automaticamente. **Valor entregue.** |

**Regra do Menor Esforço:** O fluxo é desenhado para que a primeira ação do usuário seja a mais dolorosa (migração) ou a mais familiar (escrever a nota).

---

## 🎨 Identidade Visual & UX (Carga Cognitiva Zero)

O design não é apenas estética; é uma ferramenta de **confiança** e **redução de ansiedade** para o terapeuta que lida com dados sensíveis.

**Conceito:** "Estabilidade Clínica" – O sistema deve ser calmo, profissional e não intrusivo.

### Paleta de Cores (Implementada)

| Cor | Código Hex | Propósito Comportamental |
| :--- | :--- | :--- |
| Cor | Código Hex | Propósito Comportamental |
| :--- | :--- | :--- |
| **Primary (Deep Teal)** | `#1F4E5B` | Confiança, Saúde, Serenidade. Cor principal do sistema. |
| **Action (Clay Orange)** | `#D97757` | Destaque para CTAs e ações importantes, sem urgência ou ansiedade. |
| **Background (Paper White)** | `#F8F9FA` | Conforto visual para leitura prolongada (prontuários). |
| **Text (Slate Grey)** | `#64748B` | Contraste suave, reduzindo a fadiga ocular. |

**Regra de Implementação de Cores:** Em componentes críticos (Logo, Menu Ativo, Botões Primários), usar **cores Hardcoded (Hex)** em vez de classes do Tailwind, para evitar erros de compilação/cache que poderiam comprometer a identidade visual de confiança.

### Princípios de UX

1.  **Carga Cognitiva Zero:** Nunca use jargões técnicos ("Database", "Latency"). Use termos clínicos ("Prontuário", "Agendar").
2.  **Feedback Constante:** Todo salvamento mostra "Salvo". Toda ação tem confirmação visual.
3.  **Sem Pop-ups Inúteis:** O sistema é calmo. Não interrompa o terapeuta.

---

## 🖥️ Estrutura de Telas & Componentes

### Dashboard: O Controle na Mão

O Dashboard deve responder a uma única pergunta: **"O que eu preciso fazer agora?"**

| Componente | Dado Exibido | Propósito Comportamental |
| :--- | :--- | :--- |
| **Agenda do Dia** | Próximas 3 sessões (Nome, Hora, Status de Pagamento). | **Ação Imediata:** Direciona o foco para o paciente atual. |
| **Alertas de Pagamento** | **Lista de Devedores:** "3 Pacientes com Sessões Pendentes de Cobrança." | **Gatilho de Perda:** Motiva a ação de cobrança para evitar perda de receita. **(Foco: Quem deve)** |
| **Lista de Pagamentos** | "Lista de quem pagou nas últimas 48h." | **Reforço Positivo:** Simples lista de quem pagou. Terapeutas não querem BI, querem saber quem deve e quem pagou. |

### Core Feature: Prontuário Eletrônico (Notes)

**Descrição Técnica e Comportamental:**

*   **Técnica:** Editor de texto *rich-text* minimalista, com foco em segurança. O conteúdo da nota será criptografado no **lado do cliente (Client-Side)** usando a biblioteca `crypto-js` antes de ser enviado ao banco. Isso garante que, mesmo com acesso ao banco de dados, **nem os desenvolvedores do Sessio conseguem ler as notas**, um argumento de venda fortíssimo para privacidade. [6]
*   **Comportamental:** A tela principal deve parecer um bloco de notas limpo. O terapeuta deve sentir que está escrevendo em um documento privado, não preenchendo um formulário. O **Autosave** constante (feedback visual: "Salvo") elimina a ansiedade de perder o trabalho.
*   **Regra de Saída:** Ao clicar em "Finalizar Sessão", o sistema **obriga** a pergunta: "Gerar cobrança para [Nome do Paciente]?" (Redução de fricção na monetização).

### Configuração: A Tela que o Usuário Não Deve Voltar

A configuração deve ser automatizada ao máximo.

*   **Configuração Inicial (Onboarding):** O usuário configura a **Integração Stripe** e o **Link de Agendamento** (horários disponíveis) uma única vez.
*   **Alerta de Compliance (BAA):** Para operar legalmente nos EUA (HIPAA) cobrando dinheiro, é obrigatório migrar o plano do Supabase para o **"Team Plan" ($25/mês)** para assinar o BAA digitalmente. Este é um custo fixo obrigatório pós-lançamento.
*   **Automação:** O sistema usa as configurações para:
    *   Gerar o Link de Agendamento Público.
    *   Enviar lembretes automáticos (Versão 1.1).
    *   Gerar links de pagamento via Stripe.

---

## 💻 Stack Tecnológica Justificada

A escolha da *stack* é baseada em **velocidade de lançamento, segurança e custo marginal baixo**.

| Camada | Tecnologia | Justificativa (Business & Dev) |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (React) + Tailwind CSS** | **Velocidade de Dev:** Componentes prontos e estilização rápida. **UX:** Performance de PWA (Progressive Web App) responsivo, eliminando a necessidade de um app nativo no MVP. |
| **Backend/DB** | **Supabase (PostgreSQL, Auth, RLS)** | **Segurança (HIPAA/LGPD):** O RLS (Row Level Security) é a fundação da segurança de dados de saúde, isolando logicamente os dados no banco. **Custo:** Modelo *pay-as-you-go* com custo marginal por usuário ínfimo. **Velocidade:** Backend-as-a-Service (BaaS) elimina a necessidade de construir APIs REST do zero. |
| **Pagamentos** | **Stripe** | **Monetização:** Padrão de mercado para pagamentos avulsos e recorrentes. Permite a funcionalidade de "Gerar Link de Cobrança" e a futura "Cobrança Recorrente" (Versão 1.2). |
| **Hospedagem** | **Vercel** | **DevOps Zero:** Integração nativa com Next.js e Git. Permite *deploy* rápido e escalabilidade automática sem gerenciamento de infraestrutura. |

---

## 🛣️ Checklist de Desenvolvimento (Faseado)

### Fase 1: MVP Funcional (O Núcleo que Resolve a Dor)

**Foco:** **Fluência Cognitiva** e **Migração Zero Fricção**.

| Item | Descrição | Status |
| :--- | :--- | :--- |
| **Landing Page & Auth** | Implementação da LP, Tela de Planos e Fluxo de Login/Registro (Fricção Zero). | ✅ Core |
| **Gestão de Pacientes** | CRUD (Create, Read, Update, Delete) de pacientes. | ✅ Core |
| **Prontuário (Core)** | Editor de texto criptografado com Autosave e feedback visual. **(Com Criptografia Client-Side)** | ✅ Core |
| **Agenda** | Calendário visual e Geração de "Link de Agendamento" público. | ✅ Essencial |
| **Importador** | Script para ler CSV de exportação do SimplePractice e popular o DB. **(Gatilho de Conversão)** | ✅ Essencial |

**Detalhe Técnico do Importador (Lógica de Mapeamento e Tolerância a Falhas):**

O script deve ser tolerante a falhas. Se uma linha falhar, o importador **não deve parar**. Ele deve importar o resto e gerar um relatório de "Erros de Importação" no final.

| Coluna CSV (SimplePractice) | Coluna DB (Sessio) | Lógica de Mapeamento |
| :--- | :--- | :--- |
| `First Name` + `Last Name` | `name` (patients) | Concatenação. |
| `Mobile Phone` | `contact_info` (patients) | Mapeamento direto. |
| `Date of Birth` | `dob` (patients) | Mapeamento direto (com validação de formato). |
| `Notes` (Texto do Prontuário) | `content_encrypted` (notes) | Mapeamento direto, seguido de **Criptografia Client-Side**. |
| **Faturamento Simples** | Integração Stripe para gerar link de pagamento avulso na tela de "Finalizar Sessão". | ✅ Essencial |

### Fase 2: Polimento e Ganchos de Retenção

**Foco:** **Redução de Churn** e **Otimização do Fluxo de Caixa**.

| Item | Descrição | Justificativa (Comportamental) |
| :--- | :--- | :--- |
| **Lembretes Automáticos** | Email/Whatsapp automático 24h antes da sessão. | **Redução de No-Show:** O *no-show* é a maior perda de dinheiro do terapeuta. Essa *feature* paga o SaaS. |
| **Formulários de Entrada** | Link para o paciente preencher anamnese antes da 1ª sessão. | **Profissionalismo e Tempo:** Automatiza a coleta de dados iniciais, economizando tempo do terapeuta. |
| **Refinamento do Importador** | Compatibilidade com TherapyNotes e outros concorrentes. | **Expansão de Mercado:** Aumenta o público-alvo de migração. |
| **Tática de Marketing** | **Script de Cold Email:** "Olá [Nome], sou desenvolvedor e marido de uma psicóloga. Criei um sistema simples de $29 porque ela odiava o SimplePractice. Posso te dar acesso grátis em troca de feedback?" | **Aquisição de Fundadores:** Usa a prova social e a história pessoal para adquirir os primeiros 100 usuários com baixo CAC. |

### Fase 3: Escala e Infraestrutura

**Foco:** **Monetização Recorrente** e **Conformidade Legal**.

| Item | Descrição | Justificativa (Business) |
| :--- | :--- | :--- |
| **Pagamentos Recorrentes** | Cobrança automática no cartão do paciente (Assinatura de terapia). | **Fluxo de Caixa:** Estabiliza a receita do terapeuta e a nossa (MRR). |
| **Migração Supabase Team** | Upgrade para o plano pago para obter o BAA (Business Associate Agreement). | **Conformidade Legal:** Essencial para operar com dados de saúde (HIPAA/LGPD) e cobrar o primeiro dólar. |
| **AI Scribe (Opcional)** | Transcrição e resumo automático da sessão. | **Expansão Futura:** Apenas se o mercado pedir e a regulação permitir. **Perfume** que deve ser descartado no início. |

---

## 💰 Estratégia de Monetização

**Modelo:** **Tiered Simples** com **Freemium** (Trial) implícito.

| Plano | Preço | Características | Por que Vence o Status Quo? |
| :--- | :--- | :--- | :--- |
| **Trial** | 7 dias grátis | Acesso total, incluindo o Importador de Dados. | **Foco na Migração:** O usuário usa o *feature* mais valioso (Importador) antes de pagar. |
| **Plano Solo** | **$29/mês** | Tudo Ilimitado (Pacientes, Notas, Armazenamento). | **Reducionismo Radical:** Preço baixo e previsível. O terapeuta não precisa se preocupar com limites ou taxas escondidas. |
| **Plano Anual** | $299/ano | 2 Meses Grátis. | **Retenção:** Bloqueia o cliente por 12 meses, melhorando o LTV (Lifetime Value). |

**Por que esse modelo vence o *status quo*?**

O modelo de $99/mês do concorrente é baseado em *features* corporativas (faturamento de convênio, telemedicina complexa). O Sessio adota uma estratégia **Low Touch, High Volume** [7]. Nosso custo marginal por usuário é baixo (graças ao Supabase/Vercel), permitindo um preço de $29 que é percebido como **justo** e **acessível** para o profissional autônomo.

---

## 🎣 Gatilhos de Retenção

O Sessio monitorará comportamentos que indicam o valor percebido e previnem o *churn*.

| Comportamento Monitorado | Indicador de Valor Percebido | Ação de Retenção (Gatilho) |
| :--- | :--- | :--- |
| **Uso do Importador** | O usuário está comprometido com a migração. | Enviar e-mail de "Boas-vindas" com um guia sobre a **segurança** dos dados importados. |
| **Frequência de Notas** | O usuário está usando o Core Feature (Prontuário) ativamente. | Se o usuário não escrever notas por 7 dias, enviar um lembrete sutil: "Sua agenda está cheia, não se esqueça de registrar suas sessões." |
| **Taxa de No-Show** | O usuário está economizando dinheiro com os lembretes. | Se a taxa de *no-show* cair abaixo de 5%, enviar um e-mail: "Parabéns! Você economizou X reais este mês graças aos lembretes automáticos." |
| **Uso do Link de Pagamento** | O usuário está monetizando ativamente com o sistema. | Se o usuário usar o link de pagamento 5 vezes no mês, sugerir a **Cobrança Recorrente** (Versão 1.2) como próximo passo para otimizar o fluxo de caixa. |

---

## 🗄️ Dicionário de Dados & API

Estrutura simplificada das tabelas do banco de dados (PostgreSQL via Supabase). O RLS (Row Level Security) garante que a `user_id` seja a chave de isolamento em todas as tabelas.

| Tabela | Chave Primária | Colunas Essenciais | Relacionamentos |
| :--- | :--- | :--- | :--- |
| **users** | `id` (UUID) | `email`, `password`, `stripe_customer_id` | 1:N com `patients`, `subscriptions` |
| **subscriptions** | `id` (UUID) | `user_id`, `stripe_subscription_id`, `status`, `start_date`, `end_date` | N:1 com `users` |
| **patients** | `id` (UUID) | `user_id`, `name`, `contact_info` | N:1 com `users`, 1:N com `notes` |
| **notes** | `id` (UUID) | `patient_id`, `user_id`, `content_encrypted` (TEXT), `created_at` | N:1 com `patients` |
| **appointments** | `id` (UUID) | `patient_id`, `user_id`, `start_time`, `end_time`, `payment_status` | N:1 com `patients` |

**API (Implícita):** O Sessio utiliza a API REST e o *Realtime* do Supabase. O *frontend* interage diretamente com o banco de dados via PostgREST, com a segurança garantida pelo RLS.

---

## 📈 Indicadores de Sucesso (KPIs)

O que medir para saber se o negócio é real ou apenas um projeto de hobby.

| KPI | Métrica | Meta (Curto Prazo) | Por que é Crítico? |
| :--- | :--- | :--- | :--- |
| **North Star Metric** | **Notas de Prontuário Criadas por Mês** | 5.000 | Indica o uso ativo do Core Feature e a dependência do sistema. |
| **Conversão** | **Taxa de Uso do Importador de Dados** | > 30% dos novos usuários | Valida a tese de que a migração é o principal gatilho de conversão. |
| **Retenção** | **Churn Rate** | < 5% | Essencial para a saúde do MRR. O foco na redução de *no-show* deve manter este KPI baixo. |
| **Monetização** | **MRR (Monthly Recurring Revenue)** | $10.000 (350 clientes) | Prova que o modelo de $29/mês é escalável e que o preço é inegociável. |
| **Eficiência** | **Custo de Aquisição do Cliente (CAC)** | < $50 | O modelo *Low Touch* exige um CAC baixo. O marketing de conteúdo focado em "Como migrar" deve ser o principal motor. |

---

## ⚠️ Regras de Saída (Brutalmente Honesto)

*   **Complexidade do Prontuário:** A criptografia em nível de aplicação (`content_encrypted`) é uma complexidade técnica necessária para a conformidade com dados de saúde. **Não pode ser descartada.**
*   **Funcionalidades Descartáveis (Perfume):**
    *   **Portal do Paciente:** Descartar. Adiciona complexidade de UX e segurança desnecessária. O paciente só precisa do link de agendamento e do link de pagamento.
    *   **Telemedicina Nativa:** Descartar. Usar links externos (Zoom/Meet) é a solução de menor esforço para o MVP.
    *   **Faturamento de Convênio (Insurance Billing):** Descartar. É a principal fonte de complexidade e burocracia nos concorrentes. O Sessio é *private pay* (particular) por filosofia.

---

## 📚 Referências

[1]: Better Business Bureau. *Complaints - SimplePractice LLC*.
[2]: Reddit. *I can't stand SimplePractice : r/therapists*.
[3]: G2. *SimplePractice Pros and Cons | User Likes & Dislikes*.
[4]: 314e. *10 Biggest Challenges With EHR Data Migration*.
[5]: Sessio. *O Diferencial Competitivo (A "Fosso")*. (Contexto do Projeto)
[6]: Sessio. *SEGURANÇA (ARQUITETURA)*. (Contexto do Projeto)
[7]: Sessio. *MODELO DE NEGÓCIO*. (Contexto do Projeto)
