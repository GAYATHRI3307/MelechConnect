from django.db import models

class UserProfile(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    occupation = models.CharField(max_length=50)  # "electrician" or "mechanic"
    age = models.IntegerField(null=True, blank=True)
    experience = models.IntegerField(null=True, blank=True)
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return self.email
