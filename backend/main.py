from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)
fdb = firestore.client()

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
class Employee(BaseModel):
    name: str
    role: str
    dept: str
    access: str

@app.get("/employees")
async def get_employees():
    docs = fdb.collection('employees').stream()
    employees = []
    for doc in docs:
        emp = doc.to_dict()
        emp['docId'] = doc.id
        employees.append(emp)
    return employees

@app.post("/employees")
async def add_employee(employee: Employee):
    count = len(list(fdb.collection('employees').stream()))
    emp_data = {
        "id": f"EMP{str(count + 1).zfill(3)}",
        "name": employee.name,
        "role": employee.role,
        "dept": employee.dept,
        "access": employee.access,
        "status": "Active",
        "lastLogin": "Just now",
        "risk": "Low"
    }
    doc_ref = fdb.collection('employees').add(emp_data)
    emp_data['docId'] = doc_ref[1].id
    return emp_data

@app.delete("/employees/{doc_id}")
async def delete_employee(doc_id: str):
    fdb.collection('employees').document(doc_id).delete()
    return {"message": "Employee deleted"}
class Asset(BaseModel):
    name: str
    type: str
    assignedTo: str
    dept: str
    condition: str

@app.get("/assets")
async def get_assets():
    docs = fdb.collection('assets').stream()
    assets = []
    for doc in docs:
        asset = doc.to_dict()
        asset['docId'] = doc.id
        assets.append(asset)
    return assets

@app.post("/assets")
async def add_asset(asset: Asset):
    count = len(list(fdb.collection('assets').stream()))
    asset_data = {
        "id": f"AST{str(count + 1).zfill(3)}",
        "name": asset.name,
        "type": asset.type,
        "assignedTo": asset.assignedTo,
        "dept": asset.dept,
        "condition": asset.condition,
        "status": "Assigned" if asset.assignedTo != "Unassigned" else "Available",
        "purchased": "Just added"
    }
    doc_ref = fdb.collection('assets').add(asset_data)
    asset_data['docId'] = doc_ref[1].id
    return asset_data

@app.delete("/assets/{doc_id}")
async def delete_asset(doc_id: str):
    fdb.collection('assets').document(doc_id).delete()
    return {"message": "Asset deleted"}
class OnboardingEmployee(BaseModel):
    name: str
    role: str
    dept: str
    startDate: str

@app.get("/onboarding")
async def get_onboarding():
    docs = fdb.collection('onboarding').stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item['docId'] = doc.id
        items.append(item)
    return items

@app.post("/onboarding")
async def add_onboarding(emp: OnboardingEmployee):
    count = len(list(fdb.collection('onboarding').stream()))
    data = {
        "id": f"ONB{str(count + 1).zfill(3)}",
        "name": emp.name,
        "role": emp.role,
        "dept": emp.dept,
        "startDate": emp.startDate,
        "progress": 0,
        "currentStep": "Document Verification",
        "initials": "".join([n[0] for n in emp.name.split()[:2]]).upper(),
        "steps": [
            {"name": "Document Verification", "status": "Active"},
            {"name": "System Access", "status": "Pending"},
            {"name": "IT Setup", "status": "Pending"},
            {"name": "Team Introduction", "status": "Pending"},
            {"name": "Training Program", "status": "Pending"},
        ]
    }
    doc_ref = fdb.collection('onboarding').add(data)
    data['docId'] = doc_ref[1].id
    return data

@app.delete("/onboarding/{doc_id}")
async def delete_onboarding(doc_id: str):
    fdb.collection('onboarding').document(doc_id).delete()
    return {"message": "Onboarding deleted"}
class OffboardingEmployee(BaseModel):
    name: str
    role: str
    dept: str
    lastDay: str
    reason: str

@app.get("/offboarding")
async def get_offboarding():
    docs = fdb.collection('offboarding').stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item['docId'] = doc.id
        items.append(item)
    return items

@app.post("/offboarding")
async def add_offboarding(emp: OffboardingEmployee):
    count = len(list(fdb.collection('offboarding').stream()))
    data = {
        "id": f"OFF{str(count + 1).zfill(3)}",
        "name": emp.name,
        "role": emp.role,
        "dept": emp.dept,
        "lastDay": emp.lastDay,
        "reason": emp.reason,
        "progress": 0,
        "initials": "".join([n[0] for n in emp.name.split()[:2]]).upper(),
        "steps": [
            {"name": "Resignation Accepted", "status": "Active"},
            {"name": "Knowledge Transfer", "status": "Pending"},
            {"name": "Asset Return", "status": "Pending"},
            {"name": "Exit Interview", "status": "Pending"},
            {"name": "Account Deactivation", "status": "Pending"},
            {"name": "Full & Final Settlement", "status": "Pending"},
        ]
    }
    doc_ref = fdb.collection('offboarding').add(data)
    data['docId'] = doc_ref[1].id
    return data

@app.delete("/offboarding/{doc_id}")
async def delete_offboarding(doc_id: str):
    fdb.collection('offboarding').document(doc_id).delete()
    return {"message": "Offboarding deleted"}


class BenefitEmployee(BaseModel):
    name: str
    dept: str
    plan: str

@app.get("/benefits")
async def get_benefits():
    docs = fdb.collection('benefits').stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item['docId'] = doc.id
        items.append(item)
    return items

@app.post("/benefits")
async def add_benefit(emp: BenefitEmployee):
    data = {
        "id": f"EMP{str(len(list(fdb.collection('benefits').stream())) + 1).zfill(3)}",
        "name": emp.name,
        "dept": emp.dept,
        "plan": emp.plan,
        "health": True,
        "dental": emp.plan != "Basic",
        "vision": emp.plan == "Premium",
        "life": emp.plan != "Basic",
        "status": "Enrolled"
    }
    doc_ref = fdb.collection('benefits').add(data)
    data['docId'] = doc_ref[1].id
    return data

@app.delete("/benefits/{doc_id}")
async def delete_benefit(doc_id: str):
    fdb.collection('benefits').document(doc_id).delete()
    return {"message": "Benefit deleted"}
@app.get("/dashboard/stats")
async def get_dashboard_stats():
    employees_count = len(list(fdb.collection('employees').stream()))
    onboarding_count = len(list(fdb.collection('onboarding').stream()))
    offboarding_count = len(list(fdb.collection('offboarding').stream()))
    assets_count = len(list(fdb.collection('assets').stream()))
    benefits_count = len(list(fdb.collection('benefits').stream()))

    recent_employees = []
    docs = fdb.collection('employees').limit(4).stream()
    for doc in docs:
        emp = doc.to_dict()
        emp['docId'] = doc.id
        recent_employees.append(emp)

    return {
        "totalEmployees": employees_count,
        "activeOnboarding": onboarding_count,
        "activeOffboarding": offboarding_count,
        "totalAssets": assets_count,
        "benefitsEnrolled": benefits_count,
        "recentEmployees": recent_employees
    }
class Department(BaseModel):
    name: str
    head: str
    employees: int
    budget: str

@app.get("/departments")
async def get_departments():
    docs = fdb.collection('departments').stream()
    items = []
    for doc in docs:
        item = doc.to_dict()
        item['docId'] = doc.id
        items.append(item)
    return items

@app.post("/departments")
async def add_department(dept: Department):
    count = len(list(fdb.collection('departments').stream()))
    data = {
        "id": f"DEPT{str(count + 1).zfill(3)}",
        "name": dept.name,
        "head": dept.head,
        "employees": dept.employees,
        "budget": dept.budget,
        "health": 90,
        "status": "Healthy"
    }
    doc_ref = fdb.collection('departments').add(data)
    data['docId'] = doc_ref[1].id
    return data

@app.delete("/departments/{doc_id}")
async def delete_department(doc_id: str):
    fdb.collection('departments').document(doc_id).delete()
    return {"message": "Department deleted"}
class CeoInfo(BaseModel):
    name: str
    title: str

@app.get("/ceo")
async def get_ceo():
    doc = fdb.collection('settings').document('ceo').get()
    if doc.exists:
        return doc.to_dict()
    return {"name": "Vikram Singh", "title": "Chief Executive Officer"}

@app.post("/ceo")
async def update_ceo(ceo: CeoInfo):
    fdb.collection('settings').document('ceo').set({
        "name": ceo.name,
        "title": ceo.title
    })
    return {"name": ceo.name, "title": ceo.title}