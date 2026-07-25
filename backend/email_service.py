import logging
import os

import httpx

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_FROM = os.getenv("EMAIL_FROM", "onboarding@resend.dev")
EMAIL_ENABLED = bool(RESEND_API_KEY)


def send_email(to_email: str, subject: str, html_body: str) -> bool:
    if not EMAIL_ENABLED:
        logger.info(f"Email disabled. Would send to {to_email}: {subject}")
        return True

    try:
        response = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": EMAIL_FROM,
                "to": [to_email],
                "subject": subject,
                "html": html_body,
            },
        )
        response.raise_for_status()
        logger.info(f"Email sent to {to_email}: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False


EMAIL_STYLE = """
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #0B0E11; margin: 0; padding: 40px; }
    .container { max-width: 600px; margin: 0 auto; background: #161B22; border: 1px solid rgba(255,255,255,0.1); }
    .header { background: #0B0E11; padding: 40px; text-align: center; }
    .header h1 { color: #F5A623; font-size: 26px; font-weight: 800; letter-spacing: 3px; margin: 0; text-transform: uppercase; }
    .header p { color: #F5A623; font-size: 11px; letter-spacing: 3px; margin-top: 8px; opacity: 0.8; text-transform: uppercase; }
    .body { padding: 40px; }
    .body h2 { color: #ffffff; font-size: 22px; font-weight: 700; margin-bottom: 20px; }
    .body p { color: rgba(255,255,255,0.65); line-height: 1.7; font-size: 15px; }
    .details { background: #0B0E11; padding: 24px; margin: 24px 0; border-left: 3px solid #F5A623; }
    .details p { margin: 8px 0; font-size: 14px; color: rgba(255,255,255,0.85); }
    .details strong { color: #F5A623; }
    .status-badge { display: inline-block; padding: 8px 20px; color: #0B0E11; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin: 16px 0; border-radius: 4px; }
    .ref { font-family: 'Courier New', monospace; font-size: 12px; color: rgba(255,255,255,0.4); text-align: center; margin-top: 30px; letter-spacing: 2px; }
    .footer { padding: 30px 40px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; }
    .footer p { font-size: 12px; color: rgba(255,255,255,0.4); margin: 4px 0; }
"""


def _wrap(header_label: str, body_html: str, footer_extra: str = "") -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>{EMAIL_STYLE}</style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Lynnhomes</h1>
                <p>{header_label}</p>
            </div>
            <div class="body">
                {body_html}
            </div>
            {footer_extra}
            <div class="footer">
                <p>LYNNHOMES LLC &middot; LANCASTER, CALIFORNIA</p>
                <p>DOT-COMPLIANT &middot; FULLY INSURED</p>
            </div>
        </div>
    </body>
    </html>
    """


def booking_confirmation_html(
    name: str,
    reference: str,
    load_type: str,
    pickup: str,
    delivery: str,
    company: str = None,
    notes: str = None,
) -> str:
    body = f"""
        <h2>Thanks, {name}.</h2>
        <p>Your quote request has been received. Our dispatch team will review it and get back to you within one business day with a rate and a truck.</p>
        <div class="details">
            {f'<p><strong>Company:</strong> {company}</p>' if company else ''}
            <p><strong>Load Type:</strong> {load_type}</p>
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Delivery:</strong> {delivery}</p>
            {f'<p><strong>Notes:</strong> {notes}</p>' if notes else ''}
            <p><strong>Status:</strong> Pending Review</p>
        </div>
        <p>We appreciate your interest in Lynnhomes. Our team hauls freight, heavy loads, and logistics solutions across California and the Southwest.</p>
    """
    return _wrap("Freight & Logistics", body, f'<div class="ref">REF &middot; {reference}</div>')


def booking_admin_notification_html(
    name: str,
    email: str,
    phone: str,
    load_type: str,
    pickup: str,
    delivery: str,
    reference: str,
    company: str = None,
    notes: str = None,
) -> str:
    body = f"""
        <h2>New quote request from {name}</h2>
        <p>A new quote request has been submitted through the website. Log in to the admin dashboard to review and respond.</p>
        <div class="details">
            <p><strong>Customer:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            {f'<p><strong>Company:</strong> {company}</p>' if company else ''}
            <p><strong>Load Type:</strong> {load_type}</p>
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Delivery:</strong> {delivery}</p>
            {f'<p><strong>Notes:</strong> {notes}</p>' if notes else ''}
        </div>
    """
    return _wrap("New Quote Request", body, f'<div class="ref">REF &middot; {reference}</div>')


def booking_status_html(name: str, reference: str, status: str, pickup: str, delivery: str) -> str:
    if hasattr(status, "value"):
        status = status.value

    display_status = status.capitalize()

    status_messages = {
        "approved": "Your quote request has been <strong>approved</strong>. Our dispatch team will contact you shortly to confirm pickup.",
        "cancelled": "Your quote request has been <strong>cancelled</strong>. If you believe this is an error, please contact us.",
        "completed": "Your load has been <strong>delivered</strong>. Thank you for hauling with Lynnhomes.",
    }

    status_colors = {
        "approved": "#2d8a4e",
        "cancelled": "#c0392b",
        "completed": "#F5A623",
    }

    message = status_messages.get(status, f"Your request status has been updated to {display_status}.")
    color = status_colors.get(status, "#F5A623")

    body = f"""
        <h2>Hello, {name}.</h2>
        <div class="status-badge" style="background: {color};">{display_status}</div>
        <p>{message}</p>
        <div class="details">
            <p><strong>Pickup:</strong> {pickup}</p>
            <p><strong>Delivery:</strong> {delivery}</p>
            <p><strong>Reference:</strong> {reference}</p>
        </div>
    """
    return _wrap("Freight & Logistics", body, f'<div class="ref">REF &middot; {reference}</div>')


def contact_confirmation_html(name: str, subject: str, message: str) -> str:
    body = f"""
        <h2>Thank you, {name}.</h2>
        <p>We have received your message and will respond within one business day.</p>
        <div class="details">
            <p><strong>Subject:</strong> {subject or "No subject"}</p>
            <p><strong>Message:</strong> {message}</p>
        </div>
    """
    return _wrap("Freight & Logistics", body)


def contact_admin_notification_html(name: str, email: str, subject: str, message: str) -> str:
    body = f"""
        <h2>New message from {name}</h2>
        <div class="details">
            <p><strong>From:</strong> {name} ({email})</p>
            <p><strong>Subject:</strong> {subject or "No subject"}</p>
            <p><strong>Message:</strong> {message}</p>
        </div>
    """
    return _wrap("New Contact Message", body)
