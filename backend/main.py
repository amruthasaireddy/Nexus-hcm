from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIQuery(BaseModel):
    question: str
    context: str = ""

@app.post("/ai/policy")
async def policy_ai(query: AIQuery):
    prompt = f"""
You are an AI assistant for NexusHCM, an enterprise HR platform.
You help employees find answers about company policies.

Company Policies Context:
- Leave Policy: 24 casual leaves, 12 sick leaves, 15 earned leaves per year
- WFH Policy: Up to 3 days WFH per week with manager approval
- Travel Policy: Submit expense report within 7 days with receipts
- Code of Conduct: Professional behavior expected at all times
- IT Security: No sharing of passwords, VPN required for remote access
- Anti Harassment: Zero tolerance policy, report to HR immediately

Employee Question: {query.question}

Give a clear, helpful answer in 2-3 sentences based on the policies above.
"""
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )
    return {"answer": response.choices[0].message.content}

@app.post("/ai/anomaly")
async def anomaly_ai(query: AIQuery):
    prompt = f"""
You are an AI security analyst for NexusHCM.
Analyze this security event and give a brief risk assessment.

Event: {query.question}

Give a 2 sentence risk assessment and recommended action.
"""
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150
    )
    return {"answer": response.choices[0].message.content}

@app.post("/ai/insights")
async def insights_ai(query: AIQuery):
    prompt = f"""
You are an AI HR analyst for NexusHCM.
Context: {query.context}
Question: {query.question}
Give a brief 2-3 sentence insight or recommendation.
"""
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150
    )
    return {"answer": response.choices[0].message.content}