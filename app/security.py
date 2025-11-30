"""
Security utilities for input validation and sanitization.

This module provides functions to validate and sanitize user inputs
to prevent security vulnerabilities like XSS and SQL injection.
"""
import re
from html import escape
from typing import Optional


def sanitize_html(text: str) -> str:
    """
    Sanitize HTML input by escaping special characters.
    
    Args:
        text: Raw text input that may contain HTML
        
    Returns:
        Escaped text safe for display
    """
    if not text:
        return ""
    return escape(text)


def validate_email(email: str) -> bool:
    """
    Validate email address format.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if email is valid, False otherwise
    """
    if not email:
        return False
    
    # Basic email validation pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_username(username: str) -> tuple[bool, Optional[str]]:
    """
    Validate username format and constraints.
    
    Args:
        username: Username to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not username:
        return False, "Username is required"
    
    if len(username) < 3:
        return False, "Username must be at least 3 characters long"
    
    if len(username) > 50:
        return False, "Username must be less than 50 characters"
    
    # Only allow alphanumeric and underscores
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "Username can only contain letters, numbers, and underscores"
    
    return True, None


def validate_password(password: str) -> tuple[bool, Optional[str]]:
    """
    Validate password strength.
    
    Args:
        password: Password to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not password:
        return False, "Password is required"
    
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if len(password) > 128:
        return False, "Password must be less than 128 characters"
    
    # Check for at least one uppercase, one lowercase, and one digit
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one number"
    
    return True, None


def sanitize_text_input(text: str, max_length: int = 1000) -> str:
    """
    Sanitize general text input.
    
    Args:
        text: Text to sanitize
        max_length: Maximum allowed length
        
    Returns:
        Sanitized text
    """
    if not text:
        return ""
    
    # Strip whitespace
    text = text.strip()
    
    # Limit length
    text = text[:max_length]
    
    # Escape HTML
    text = escape(text)
    
    return text


def validate_age(age: int) -> tuple[bool, Optional[str]]:
    """
    Validate age input.
    
    Args:
        age: Age value to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if age is None:
        return True, None  # Age is optional
    
    if not isinstance(age, int):
        return False, "Age must be a number"
    
    if age < 0:
        return False, "Age cannot be negative"
    
    if age > 150:
        return False, "Please enter a valid age"
    
    return True, None


def validate_phone(phone: str) -> tuple[bool, Optional[str]]:
    """
    Validate phone number format.
    
    Args:
        phone: Phone number to validate
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not phone:
        return True, None  # Phone is optional
    
    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)\+]', '', phone)
    
    # Check if it contains only digits
    if not cleaned.isdigit():
        return False, "Phone number can only contain digits"
    
    # Check length (10-15 digits is common for international numbers)
    if len(cleaned) < 10 or len(cleaned) > 15:
        return False, "Phone number must be between 10 and 15 digits"
    
    return True, None
