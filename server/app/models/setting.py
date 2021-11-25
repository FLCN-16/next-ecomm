from sqlalchemy import Column, Integer, String, DateTime

from app.models import Base


class Setting(Base):
  __tablename__ = 'settings'

  id = Column(Integer, primary_key=True)
  name = Column(String(255), nullable=False)
  value = Column(String(255), nullable=False)
  created_at = Column(DateTime(timezone=True), nullable=False)
  updated_at = Column(DateTime(timezone=True), nullable=False)