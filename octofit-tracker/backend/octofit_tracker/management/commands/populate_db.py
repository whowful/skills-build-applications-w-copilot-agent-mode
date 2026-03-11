from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete all existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel')
        dc = Team.objects.create(name='dc')

        # Create users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel')
        captain = User.objects.create(email='captain@marvel.com', name='Captain America', team='marvel')
        batman = User.objects.create(email='batman@dc.com', name='Batman', team='dc')
        superman = User.objects.create(email='superman@dc.com', name='Superman', team='dc')

        # Create activities
        Activity.objects.create(user='Iron Man', activity_type='run', duration=30, date='2026-03-10')
        Activity.objects.create(user='Captain America', activity_type='cycle', duration=45, date='2026-03-09')
        Activity.objects.create(user='Batman', activity_type='swim', duration=25, date='2026-03-08')
        Activity.objects.create(user='Superman', activity_type='fly', duration=60, date='2026-03-07')

        # Create leaderboard
        Leaderboard.objects.create(team='marvel', points=75)
        Leaderboard.objects.create(team='dc', points=85)

        # Create workouts
        Workout.objects.create(name='Pushup', description='Do pushups', difficulty='easy')
        Workout.objects.create(name='Pullup', description='Do pullups', difficulty='medium')
        Workout.objects.create(name='Squat', description='Do squats', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('octofit_db successfully populated with test data'))
