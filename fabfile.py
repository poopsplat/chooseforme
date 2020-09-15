from fabric.api import *
import os

env.hosts = ['opal4.opalstack.com']
env.user = 'soriamatt'
env.path = '~/Sites/chooseforme'
env.remotepath = '/home/soriamatt/apps/chooseforme'
env.git_branch = 'master'
env.warn_only = True
env.remote_protocol = 'http'

def deploy():
  update()
  local('rm -rf build')
  local('yarn build')
  put('build', env.remotepath)

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))
