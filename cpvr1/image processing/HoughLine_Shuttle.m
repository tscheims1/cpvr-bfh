%##########################################################################
% File:       HoughLine_Shuttle.m
% Purpose:    Rotate the shuttle by finding the longest line 
% Author:     Marcus Hudritsch
% Date:       25-MAY-2013
% Copyright:  Marcus Hudritsch, Kirchrain 18, 2572 Sutz
%             THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL PURPOSE ONLY AND
%             WITHOUT ANY WARRANTIES WHETHER EXPRESSED OR IMPLIED.
%##########################################################################
clear all; close all; clc; %clear matrices, close figures & clear cmd wnd.

RGB = imread('/home/tscheims/Documents/Images/Shuttle2.jpg');
I  = rgb2gray(RGB);     % convert to intensity
BW = edge(I,'canny');   % extract edges
imshow(BW);

% Transform into hough space H with all thetas T and rhos R
[H,T,R] = hough(BW, 'ThetaResolution',0.5, 'RhoResolution', 1); 

% Show the hough space with T & R as axis scales
figure, imshow(H,[],'XData',T,'YData',R,'InitialMagnification','fit');
xlabel('\theta'), ylabel('\rho');
axis on, axis normal, hold on;
colormap(jet);

% Get the thetas & rhos of the 5 brightest peaks
P = houghpeaks(H,5);
x = T(P(:,2)); y = R(P(:,1));  % Get the x & y coords out of T & P
plot(x,y,'s','color','white');



figure;
RGB_ROT = imrotate(RGB,x(1,2));
imshow(RGB_ROT);

