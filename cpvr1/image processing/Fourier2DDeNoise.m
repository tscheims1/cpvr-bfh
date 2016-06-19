%##########################################################################
% File:       Fourier2DDeNoise.m
% Purpose:    Adding structural noise to the Lena image
% Author:     Marcus Hudritsch
% Date:       15-FEB-09
% Copyright:  Marcus Hudritsch, Kirchrain 18, 2572 Sutz
%             THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL PURPOSE ONLY AND
%             WITHOUT ANY WARRANTIES WHETHER EXPRESSED OR IMPLIED.
%##########################################################################
clear all; close all; clc; %clear matrices, close figures & clear cmd wnd.

X = imread('/home/tscheims/Documents/Images/Lena128.png');    %Load image into matrix X
I = im2double(X);                       %Convert to doubles [0-1]
s = size(I,1);                          %Get the size if I

subplot(1,2,1), imshow(I);
pause;

%Create noise image with a sine wave
Noise = zeros(s);
for v=1:s
   for u=1:s
      Noise(v,u) = 0.2 * sin(2*pi/s*(16*u + 24*v));
   end
end

subplot(1,2,1), imshow(Noise);
pause;

I2 = I + Noise;
subplot(1,2,1), imshow(I2);
imwrite(I2,'/home/tscheims/Documents/Images/LenaWithNoise','png');

I3 = fft2(I2);%
H_amp = log(abs(fftshift(I3)));
H1_amp = log(abs(fftshift(fft2(I))));
mesh(H_amp);
figure
mesh(H1_amp);
%H_amp
%H2_amp = H1_amp - H_amp

figure
%mesh(H2_amp)
%Phase = angle(I3)

%F = real(I3)(I3);
%imshow(ifft2(F))
mag =  sqrt(real(I3).^2 + imag(I3).^2);
mag_old = sqrt((real(I).^2 + imag(I).^2));
phase = atan2(imag(I3),real(I3));

%mdiff = mag-mag_old;
%mesh((mdiff))

mag(mag >1000 & mag<6000) = 0;
%for v=1:s
%   for u=1:s
%    if(mag(v,u)>1000 && mag(v,u) < 6000)
%        mag(v,u) = 0;
%    end
%   end
%end
figure;
re = mag .* cos(phase);
im = mag .* sin(phase);
F = re + 1i*im;
imshow(ifft2(F))


