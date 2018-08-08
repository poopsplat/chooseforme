from fabric.api import *
import os

env.hosts = ['chooseforme.mattsoria.com']
env.user = 'poopsplat'
env.path = '~/Sites/chooseforme'
env.remotepath = '/home/poopsplat/webapps/chooseforme'
env.git_branch = 'master'
env.warn_only = True
env.remote_protocol = 'http'

def deploy():
  update()

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))
