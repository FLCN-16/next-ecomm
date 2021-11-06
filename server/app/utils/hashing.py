import hashlib, binascii, os

def hash_password(password):
  """Hash a password for storing."""
  salt = hashlib.sha256( os.urandom(60) ).hexdigest().encode('ascii')
  pwdhash = hashlib.pbkdf2_hmac( 'sha512', password.encode('utf-8'), salt, 100000)
  pwdhash = binascii.hexlify( pwdhash )

  return (salt + pwdhash).decode('ascii')

def verify_password(hashed_password, password):
  """Verify a stored password against one provided by user"""
  salt = hashed_password[:64]
  hashed_password = hashed_password[64:]

  pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt.encode('ascii'), 100000)
  pwdhash = binascii.hexlify(pwdhash).decode('ascii')

  return hashed_password == pwdhash

def generate_session_id():
  """Generate a session id."""
  return hashlib.sha256(os.urandom(60)).hexdigest()

def encrypt_session(session_id):
  """Encrypt a session id for storage."""
  return hashlib.sha256(session_id.encode('ascii')).hexdigest()

def validate_session(session_id, hashed_session_id):
  """Validate a session id by comparing it to the stored hash."""
  return hashed_session_id == encrypt_session(session_id)