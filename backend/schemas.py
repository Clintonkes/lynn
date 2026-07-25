from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    load_type: str
    pickup: str
    delivery: str
    company: Optional[str] = None
    notes: Optional[str] = None


class BookingResponse(BaseModel):
    id: int
    reference: str
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    load_type: Optional[str]
    pickup: Optional[str]
    delivery: Optional[str]
    notes: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BookingStatusUpdate(BaseModel):
    status: str


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: Optional[str] = None
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    subject: Optional[str]
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
