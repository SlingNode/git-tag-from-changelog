const fs = require('fs')
const semver = require('semver')
const gitP = require('simple-git')
const core = require('@actions/core')

const readFileSync = fileName => {
  return fs.readFileSync(fileName, 'utf8')
}

const getLatestGitTag = data => {
  const pattern = /(?<=## \[)(.*?)(?=\])/
  const latestGitTag = data.match(pattern)[0].trim()
  return latestGitTag
}

const listGitTags = async (repoPath = '.') => {
  const git = gitP(repoPath)
  const tags = await git.tags()
  return tags.all
}

const createNewTag = async (tagName, repoPath = '.') => {
  const git = gitP(repoPath)
  await git.addTag(tagName)
  await git.pushTags('origin')
}

const main = async () => {
  const data = readFileSync(core.getInput('changelog_file'))

  const latestGitTagFromChangelog = getLatestGitTag(data)
  console.log(`latest_git_tag_from_changelog -> ${latestGitTagFromChangelog}`)

  const gitTags = await listGitTags()
  console.log(`gitTags -> ${gitTags}`)
  const latestRepoGitTag = gitTags[gitTags.length - 1]
  console.log(`latest_repo_git_tag -> ${latestRepoGitTag}`)

  if (semver.gt(latestGitTagFromChangelog, latestRepoGitTag)) {
    console.log('New tag needs to be created')
    await createNewTag(latestGitTagFromChangelog)
  } else {
    console.log('Repo tag is higher than CHANGELOG.md tag')
    process.exit(1)
  }
}

main().catch(console.error)
