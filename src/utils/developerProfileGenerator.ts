import { DeveloperProfileData } from '../types';

export function generateRandomAlphanumeric(length: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateRandomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16).toUpperCase();
  });
}

export function generateDeveloperProfile(custom?: Partial<DeveloperProfileData>): DeveloperProfileData {
  const teamId = custom?.teamId || generateRandomAlphanumeric(10);
  const developerName = custom?.developerName || 'Tanvir Rahman';
  const companyName = custom?.companyName || 'Apex Studios Global';
  const slug = (custom?.companyName || companyName).toLowerCase().replace(/[^a-z0-9]/g, '');
  const bundleId = custom?.bundleId || `com.${slug || 'apexstudios'}.testapp`;
  
  // Format standard 40-char iPhone UDID or 25-char (00008030-000215891A80802E)
  const udid = custom?.udid || `${generateRandomHex(8).toUpperCase()}-${generateRandomHex(16).toUpperCase()}`;

  return {
    developerName,
    companyName,
    teamId,
    bundleId,
    entityType: custom?.entityType || 'individual',
    accountType: custom?.accountType || 'Apple Developer Program',
    udid,
    appPrefix: teamId,
    provisioningProfileType: custom?.provisioningProfileType || 'development',
    iosVersionTarget: custom?.iosVersionTarget || 'iOS 18.0+'
  };
}

export function generateMobileConfigFile(profile: DeveloperProfileData): string {
  const payloadUUID = generateUUID();
  const profileUUID = generateUUID();

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadDescription</key>
            <string>Developer Test Configuration for ${profile.companyName}</string>
            <key>PayloadDisplayName</key>
            <string>${profile.companyName} Developer WebClip</string>
            <key>PayloadIdentifier</key>
            <string>${profile.bundleId}.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>${payloadUUID}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Label</key>
            <string>${profile.companyName} Portal</string>
            <key>URL</key>
            <string>https://developer.apple.com</string>
            <key>IsRemovable</key>
            <true/>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Apple Developer Profile &amp; Test Environment generated via iRegion Pro. Team ID: ${profile.teamId}</string>
    <key>PayloadDisplayName</key>
    <string>${profile.companyName} Test Profile</string>
    <key>PayloadIdentifier</key>
    <string>com.iregionpro.${profile.teamId.toLowerCase()}</string>
    <key>PayloadOrganization</key>
    <string>${profile.companyName}</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${profileUUID}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;
}

export function downloadMobileConfig(profile: DeveloperProfileData): void {
  const xmlContent = generateMobileConfigFile(profile);
  const blob = new Blob([xmlContent], { type: 'application/x-apple-aspen-config' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${profile.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_developer.mobileconfig`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
