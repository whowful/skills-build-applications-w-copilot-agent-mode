from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(email='test@example.com', name='Test User', team='marvel')
        self.assertEqual(user.email, 'test@example.com')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='marvel')
        self.assertEqual(team.name, 'marvel')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test User', activity_type='run', duration=30, date='2026-03-11')
        self.assertEqual(activity.activity_type, 'run')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(team='marvel', points=100)
        self.assertEqual(lb.team, 'marvel')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushup', description='Do pushups', difficulty='easy')
        self.assertEqual(workout.name, 'Pushup')
