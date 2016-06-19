%##########################################################################
% File:       Fourier2DFilterInverse.m
% Purpose:    Solution of the Fourier filter exercise
% Author:     Marcus Hudritsch
% Date:       15-FEB-09
% Copyright:  Marcus Hudritsch, Kirchrain 18, 2572 Sutz
%             THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL PURPOSE ONLY AND
%             WITHOUT ANY WARRANTIES WHETHER EXPRESSED OR IMPLIED.
%##########################################################################
clear all; close all; clc; %clear matrices, close figures & clear cmd wnd.

g = imread('/home/tscheims/Documents/Images/Lena128.png');

g = im2double(g);

subplot(1,3,1); imshow(g); title('Input image');

%Create blur filter
h = fspecial('motion', 40, -10);
h = imnoise(h,'salt & pepper', 0.2);


%salt und pepper =  sehr viele peaks 
%gaussian Peaks gleichmässiger verteilt

%h = imnoise(g,'gaussian',0,0.4);

%h = imnoise(h,'salt & pepper',0.02);
%figure;
%imshow(h);


%Transform filter into frequency space
H = fft2(h,size(g,1),size(g,2));
H_amp = log(abs(fftshift(H))); %Amplitudes of kernel

%Apply filter in frequency space not in time space
%Applying filter in space domain would add high frequencies at the border.
G = fft2(g);    %transform image into frequency domain
F = G .* H;     %Componentwise multiply
f = ifft2(F);   %Transform back into space domain

subplot(1,3,2); imshow(f); title('Blurred image');

%Create inverse filter. If values are near zero they must be 1 
invH = (abs(H) > 0.00001) .* (1./H); 
invH_amp = log(abs(fftshift(invH))); %Amplitudes of inverse kernel

%Apply inverse filter in frequency domain
F = ifft2(fft2(f) .* invH);

subplot(1,3,3); imshow(F); title('Deconvolved image');

figure;
mesh(H_amp);

figure;
mesh(invH_amp);

