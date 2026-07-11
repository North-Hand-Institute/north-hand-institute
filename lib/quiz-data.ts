// Quiz questions — mirrors the NCBTMB submission assessment exactly.
// answerIndex is the 0-based index of the correct option.

export type QuizQuestion = {
  id: number
  module: number
  moduleTitle: string
  prompt: string
  options: string[]
  answerIndex: number
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    module: 1,
    moduleTitle: "First Contact: The Phone Call",
    prompt: "What are the five primary goals of an initial client phone consultation?",
    options: ["Diagnose, prescribe, schedule, invoice, and document","Build rapport, assess the client's needs, educate and redirect when appropriate, communicate your qualifications, and book with an incentive","Collect insurance, verify identity, quote a price, confirm availability, and end the call","Upsell packages, collect a deposit, confirm parking, describe modalities, and hang up"],
    answerIndex: 1,
  },
  {
    id: 2,
    module: 1,
    moduleTitle: "First Contact: The Phone Call",
    prompt: "When a client requests a specific technique the therapist does not specialize in, the most professional response is to:",
    options: ["Refuse the appointment and refer them elsewhere immediately","Agree to provide only that technique regardless of clinical need","Tell the client the technique they requested is ineffective","Validate the request, then offer a professional recommendation that may include additional techniques suited to the client's goals"],
    answerIndex: 3,
  },
  {
    id: 3,
    module: 1,
    moduleTitle: "First Contact: The Phone Call",
    prompt: "Requiring a credit card to reserve an appointment primarily serves to:",
    options: ["Protect the therapist's income against same-day cancellations and no-shows, while framing the practice as professional","Charge the client in advance of the session","Replace the need for a cancellation policy","Guarantee the client cannot reschedule"],
    answerIndex: 0,
  },
  {
    id: 4,
    module: 2,
    moduleTitle: "The Intake Interview",
    prompt: "An effective follow-up question during intake is valuable because it:",
    options: ["Fills time while the therapist prepares the table","Replaces the need for a written health history","Elicits clinically relevant information that a standard intake form often does not capture","Confirms the client's insurance coverage"],
    answerIndex: 2,
  },
  {
    id: 5,
    module: 2,
    moduleTitle: "The Intake Interview",
    prompt: "Asking a client about their occupation, leisure activities, and self-care habits is important because these questions:",
    options: ["Reveal how the client uses their body day to day, informing treatment planning in ways a symptom list cannot","Are required by state law in all jurisdictions","Determine the price of the session","Are only relevant for athletic clients"],
    answerIndex: 0,
  },
  {
    id: 6,
    module: 2,
    moduleTitle: "The Intake Interview",
    prompt: "The most natural point to ask a client for permission to contact their other treating practitioner is:",
    options: ["Before the client has arrived, during the booking call","Only after the treatment has ended","It should never be raised with the client directly","During the intake, flowing naturally from the conversation about their other therapies and self-care"],
    answerIndex: 3,
  },
  {
    id: 7,
    module: 3,
    moduleTitle: "Creating a Multi-Sensory Experience",
    prompt: "According to this course, the treatment environment — sound, scent, temperature, and lighting — matters because:",
    options: ["It allows the therapist to charge a higher rate","The client's nervous system begins responding to the room before hands-on work begins, shaping the therapeutic experience","State regulations mandate specific room conditions","It is only relevant for spa settings, not clinical practice"],
    answerIndex: 1,
  },
  {
    id: 8,
    module: 3,
    moduleTitle: "Creating a Multi-Sensory Experience",
    prompt: "When setting up the room, the recommended way to ask about a client's sensory preferences is to:",
    options: ["Assume the therapist's usual setup suits everyone","Ask only about music, since scent and temperature rarely matter","Offer each option alongside its opposite (for example, “music, or would you prefer quiet?”) so the client feels free to choose","Wait for the client to complain before making any changes"],
    answerIndex: 2,
  },
  {
    id: 9,
    module: 3,
    moduleTitle: "Creating a Multi-Sensory Experience",
    prompt: "The principle of accommodating client preferences “within reason” means the therapist should:",
    options: ["Agree to any request a client makes without exception","Refuse all changes once the session has begun","Only accommodate preferences that cost the therapist nothing","Freely adjust comfort and sensory factors, but never compromise safety, draping, scope of practice, or professional boundaries"],
    answerIndex: 3,
  },
  {
    id: 10,
    module: 4,
    moduleTitle: "Collaborative Care",
    prompt: "This course argues that coordinating care with a client's other practitioners should be:",
    options: ["The new norm, because practitioners treating the same body should not work in isolation from one another","Avoided, to prevent overstepping professional boundaries","Done only when the client explicitly complains","Reserved for therapists with medical degrees"],
    answerIndex: 0,
  },
  {
    id: 11,
    module: 4,
    moduleTitle: "Collaborative Care",
    prompt: "When contacting a client's other healthcare provider, an effective opening move is to:",
    options: ["Lead with your own credentials and years of experience","Ask the provider to refer all their patients to you","Lead with the shared patient's name and state that you have the client's permission to reach out","Explain why your approach is superior to theirs"],
    answerIndex: 2,
  },
  {
    id: 12,
    module: 5,
    moduleTitle: "Practitioner Networking",
    prompt: "The key difference between collaboration and networking as presented in this course is that:",
    options: ["Collaboration is proactive while networking is reactive","Collaboration is reactive (prompted by a shared client) while networking is proactive (building relationships before a shared client exists)","They are identical activities with different names","Networking applies only to spa owners"],
    answerIndex: 1,
  },
  {
    id: 13,
    module: 5,
    moduleTitle: "Practitioner Networking",
    prompt: "An effective strategy for building a professional referral relationship with another practitioner's office is to:",
    options: ["Send mass emails and follow up aggressively until they respond","Wait for other practitioners to contact you first","Offer to work for free to earn their trust","Introduce yourself in person, ask for the office manager, keep it brief and warm, and leave materials behind"],
    answerIndex: 3,
  },
  {
    id: 14,
    module: 6,
    moduleTitle: "The Checkout & Client Retention",
    prompt: "The most effective time to ask a client for an online review is:",
    options: ["Right after the client has expressed satisfaction with the work, with framing that emphasizes helping others find you and minimal friction","Before the session begins, while collecting payment information","Several weeks later by certified mail","Only if the client asks how they can help"],
    answerIndex: 0,
  },
  {
    id: 15,
    module: 6,
    moduleTitle: "The Checkout & Client Retention",
    prompt: "Managing a client's post-treatment expectations — such as explaining that soreness may follow deep work — supports retention because it:",
    options: ["Discourages the client from booking again","Eliminates the need for a follow-up appointment","Reframes an expected after-effect as evidence the work was effective, rather than a reason for concern or a poor review","Guarantees the client will feel no discomfort"],
    answerIndex: 2,
  },
]

export const PASS_THRESHOLD_PERCENT = 75
export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length
